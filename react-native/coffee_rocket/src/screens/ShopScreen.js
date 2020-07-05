import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet } from "react-native";

import CityList from '../components/CityList';
import CategoryList from '../components/CategoryList';
import GoodsList from '../components/GoodsList';
//import { THEME } from '../theme';

const ShopScreen = ({ deviceWidth }) => {
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const resetCategory = () => setSelectedCategory(null);

    selectedCity && console.log('selectedCity id = ', selectedCity);
    
    const cities = !selectedCity  ?
        <CityList 
            selectCity={setSelectedCity}
            deviceWidth={deviceWidth}
        /> : null;

    const categories = selectedCity && !selectedCategory ?
        <CategoryList 
            deviceWidth={deviceWidth}
            city={selectedCity}
            selectCategory={setSelectedCategory}
        /> : null;

    const goods = selectedCity && selectedCategory ?
        <GoodsList 
            deviceWidth={deviceWidth}
            city={selectedCity}
            category={selectedCategory}
            back={resetCategory}
        /> : null;

    return (
        <View style={styles.root}>
            {cities}
            {categories}
            {goods}
        </View>
    );
};



const styles = StyleSheet.create({
    root: {
        flex: 1,
        //alignContent: 'center',
        //justifyContent: 'center',

        borderWidth: 2,
        borderColor: 'blue'
    }
});

export default ShopScreen;