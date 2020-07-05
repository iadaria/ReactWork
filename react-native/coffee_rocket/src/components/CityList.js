import React, { useEffect } from 'react';
import { DATA } from '../store/data';
import { 
    View, 
    //Dimensions, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    FlatList, 
    Image } from "react-native";

const CityList = ({ deviceWidth, selectCity }) => {
    const [cities, setCities] = React.useState([]);
    
    useEffect(() => {
        setCities(DATA.cities);
        console.log('set cities');
    }, []);

    return (
        <>
            <View style={styles.navbar}>
                <Text style={styles.navbarText}>Выберите ваш город</Text>
                <Text style={styles.navbarText}>Help icon</Text>
            </View>
            <FlatList
                data={cities}
                renderItem={({ item }) => _renderCity(item, deviceWidth, selectCity)}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
};

function _renderCity(item, deviceWidth, selectCity) {
    const tempImg = "../store/data/img/Dnepr.png";
    return (
        <TouchableOpacity 
            style={[
                styles.city,
            ]}
            onPress={selectCity.bind(null, item.id)}
        >
            <Image

                resizeMode="cover"
                style={[
                    styles.cityImage, 
                    { width: deviceWidth - 4, height: deviceWidth / 2.2, overflow: 'visible'}
                ]}
                source={require(tempImg)}
            />
            <Text style={styles.cityHeader}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingVertical: 5
    },
    navbarText: {
        fontWeight: 'bold',
        color: 'gray'
    },
    city: {
        borderWidth: 1,
        borderColor: 'green'
    },
    cityImage: {
        overflow: 'visible',
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        //width: width - THEME.MARGIN_HORIZONTAL * 2,
        //height: ( width - THEME.MARGIN_HORIZONTAL * 2 ) / 2.5,
        //maxWidth: height,
        //maxHeight: height / 2.5,
        
        borderWidth: 1,
        borderColor: 'red'
    },
    cityHeader: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default CityList;