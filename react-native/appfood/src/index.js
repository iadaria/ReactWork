import React, { useEffect, useCallback } from 'react';
import {  View, Dimensions, ScrollView, Image, StyleSheet } from "react-native";

import Swiper from 'react-native-swiper';
import TutofoxService from './services/tutofox-service';
import { CategoryList } from './components/CategoryList';
import { FoodList } from './components/FoodList';

let { height, width } = Dimensions.get("window");

export default function App() {
    const [dataBanner, setDataBanner] = React.useState([]);
    const [dataCategories, setDataCategories] = React.useState([]);
    const [dataFood, setDataFood] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const tutofoxService = new TutofoxService();
    const loadData = useCallback(async () => {
        setLoading(true);
        const { banner, categories, food } = await tutofoxService.getAllData();
        setDataBanner(banner);
        setDataCategories(categories);
        setDataFood(food);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    /* console.log(
        `'selectedCategory' after render in ${Date.now()}`,
        selectedCategory
    ); */

    return (
        <View>
            <ScrollView
                scrollEnabled={true}
            >
                <View style={styles.root}>
                    <Image
                        
                        style={styles.imageLogo}
                        resizeMode="contain"
                        source={require("../assets/img/foodapp_logo3.png")}
                    />

                    <Swiper
                        style={styles.bannerContainer}
                        showsButtons={true}
                        autoplay={false}
                        autoplayTimeout={2}>
                        {
                            dataBanner.map((banner, index) => (
                                <Image key={index} style={styles.imageBanner} source={{ uri: banner }} />
                            ))
                        }
                    </Swiper>
                </View>
                <View style={styles.searchSection}>
                    <CategoryList 
                        categories={dataCategories} 
                        onSelect={setSelectedCategory} 
                        selectedCategory={selectedCategory}    
                    />
                    <FoodList 
                        food={dataFood} 
                        selectedCategory={selectedCategory}
                    />
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',

        borderWidth: 3,
        borderColor: 'red'
    },

    searchSection: {
        width: width,
        paddingVertical: 20,
        backgroundColor: 'white',//'blue',
        borderRadius: 20,
    },

    imageLogo: {
        height: 80,
        width: width / 2,
        margin: 10
    },
    bannerContainer: {
        //backgroundColor: 'blue',
        //width: '100%',
        height: width / 2
        //borderWidth: 1,
        //borderColor: 'green',
        //width: height / 2,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        alignSelf: 'center'
    },
});