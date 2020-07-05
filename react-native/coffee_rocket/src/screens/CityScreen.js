import React, { useEffect } from 'react';
import { 
    View, 
    //Dimensions, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    FlatList, 
    Image } from "react-native";
import { DATA } from '../store/data';
//import { THEME } from '../theme';

const CityScreen = ({ deviceWidth }) => {
    const [cities, setCities] = React.useState([]);

    useEffect(() => {
        setCities(DATA.cities);
        console.log('set cities');
    }, []);

    return (
        <View style={styles.root}>
            <FlatList
                data={cities}
                renderItem={({ item }) => _renderCity(item, deviceWidth)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

function _renderCity(item, deviceWidth) {
    const tempImg = "../store/data/img/Dnepr.png";
    return (
        <TouchableOpacity style={[
            styles.city,
        ]}>
            <Image

                resizeMode="cover"
                style={[
                    styles.cityImage, 
                    { width: deviceWidth, height: deviceWidth / 2.2}
                ]}
                source={require(tempImg)}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        //alignContent: 'center',
        //justifyContent: 'center',

        borderWidth: 2,
        borderColor: 'blue'
    },
    city: {
        borderWidth: 1,
        borderColor: 'green'
    },
    cityImage: {
        overflow: 'visible',
        //width: width - THEME.MARGIN_HORIZONTAL * 2,
        //height: ( width - THEME.MARGIN_HORIZONTAL * 2 ) / 2.5,
        //maxWidth: height,
        //maxHeight: height / 2.5,
        
        borderWidth: 1,
        borderColor: 'red'
    }
});

export default CityScreen;