import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME } from '../theme';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


let { height, width } = Dimensions.get('window');
Geolocation.getCurrentPosition(info => {
    console.log('info', info);
}, error => console.log('Error in getLocation: ', JSON.stringify(error)) )

export const AddressScreen = () => {
    const [region, setRegion] 
        = useState( { 
            latitude: 52.029967572079705, 
            longitude: 113.50414849999987, 
            latitudeDelta: 0.04,
            longitudeDelta: 0.05 });

    const movementMarker = (e) => setRegion({...region,
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
    });

    const onClickMap = (e) => {
        const { latitude, longitude } = e.coordinate
        setRegion({ ...region, latitude: latitude, longitude: longitude });
    }

    function _getLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log('info', info);
            setRegion({...region,
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            });
        }, error => console.log('Error in getLocation: ', JSON.stringify(error)) )
    }

    return (
        <View style={styles.root}>
            <Text>Google map api</Text>

            <MapView
                style={styles.map}
                region={region}
                //onRegionChange={setRegion}
                onPress={(e) => onClickMap(e.nativeEvent)}
                initialRegion={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0121,
                }}
            >

                <Marker draggable
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    title="ресторан 'Нияма', г.Чита, Анохина, 66"
                    onDragEnd={(e) => movementMarker(e)}
                />
            </MapView>

            <TouchableOpacity style={styles.locate} onPress={() => _getLocation()}>
                <Icon name="md-locate" size={50} color="grey" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: width,
        height: height - THEME.BOTTOM_BAR_HEIGHT
    },
    locate: {
        position: 'absolute',
        top: 10,
        right: 10,
        height: 60,
        width: 60,
        alignItems: 'center',
        padding: 4,
        borderRadius: 50,
        backgroundColor: 'white',

        //borderWidth: 2,
        //borderColor: 'blue',
    }
});
