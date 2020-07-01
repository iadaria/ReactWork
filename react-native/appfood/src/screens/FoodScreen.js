import React, { useEffect, useCallback } from 'react';
import { View, Dimensions, ScrollView, Image, StyleSheet } from "react-native";

//import Icon from 'react-native-vector-icons/Ionicons';

import Swiper from 'react-native-swiper';
import TutofoxService from '../services/tutofox-service';
import { CategoryList } from '../components/CategoryList';
import { FoodList } from '../components/FoodList';
import AsyncStorage from '@react-native-community/async-storage';

let { height, width } = Dimensions.get("window");

export function FoodScreen({ selectedCategory, setSelectedCategory, setCountFood }) {
    const [count, setCount] = React.useState(0);
    const [fetchedData, setFetchedData] = React.useState(
        { banner: [], categories: [], food: [] }
    );
    const [loading, setLoading] = React.useState(false);
    const tutofoxService = new TutofoxService();

    const loadData = useCallback(async () => {
        setLoading(true);
        const { banner, categories, food } = await tutofoxService.getAllData();
        setFetchedData({ banner, categories, food });
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
        return () => setCountFood(0);
    }, []);

    const addToCart = (itemForAdd) => {
        const newCount = count + 1;
        setCount(newCount);
        setCountFood(newCount); console.log('count', count);
    
        AsyncStorage.getItem('cart').then(dataCart => {
            if (dataCart !== null) {
                const cart = JSON.parse(dataCart);

                const foundItem = cart.find(item => item.food.name === itemForAdd.name);
                //console.log('found item, it is', !!foundItem);
                if (!!foundItem) {
                    foundItem.quantity = foundItem.quantity + 1;
                } else {
                    cart.push(createNewOrder(itemForAdd));
                }
                AsyncStorage.setItem('cart', JSON.stringify(cart));
                //console.log('add cart from storage',JSON.stringify(cart, null, 2));
            } else {
                const cart = [];
                cart.push(createNewOrder(itemForAdd));
                AsyncStorage.setItem('cart', JSON.stringify(cart));
                //console.log('added new cart', JSON.stringify(cart, null, 2));
            }
        }).catch(err => console.log('Error added cart: ', err))
    }

    const createNewOrder = (item) => ({
        food: item,
        quantity: 1,
        price: item.price
    });

    return (

        <ScrollView
            scrollEnabled={true}
        >
            <View style={styles.root}>
                <Image

                    style={styles.imageLogo}
                    resizeMode="contain"
                    source={require("../../assets/img/foodapp_logo3.png")}
                />

                <Swiper
                    style={styles.bannerContainer}
                    showsButtons={true}
                    autoplay={false}
                    autoplayTimeout={2}>
                    {
                        fetchedData.banner.map((banner, index) => (
                            <Image key={index} style={styles.imageBanner} source={{ uri: banner }} />
                        ))
                    }
                </Swiper>
            </View>
            <View style={styles.food}>
                <CategoryList
                    categories={fetchedData.categories}
                    onSelect={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                <FoodList
                    food={fetchedData.food}
                    selectedCategory={selectedCategory}
                    addToCart={addToCart}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',

        //borderWidth: 3,
        //borderColor: 'red'
    },
    food: {
        width: width,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
    },

    imageLogo: {
        height: 80,
        width: width / 2,
        margin: 10
    },
    bannerContainer: {
        height: width / 2
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        alignSelf: 'center'
    },
});