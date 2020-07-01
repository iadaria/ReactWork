import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TouchableHighlightComponent, ScrollView } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME } from '../theme';

let { height, width } = Dimensions.get("window");

export const CartScreen = () => {
    const [dataCart, setDataCart] = React.useState([]);

    useEffect(() => {
        AsyncStorage.getItem('cart').then(cart => {
            if (cart !== null) {
                const cartFood = JSON.parse(cart);
                setDataCart(cartFood);
            }
        }).catch(err => console.log('error when search cart data from the storage: ', err));
    }, []);

    /* const data = { "name": "Drink", "price": 56, "category": 1, image: "" };
    const itemCart = {
        food: data,
        quantity: 1,
        price: data.price
    }; */

    const increment = (index) => {
        const newDataCart = dataCart.slice();
        newDataCart[index].quantity = newDataCart[index].quantity + 1;
        setDataCart(newDataCart);
        AsyncStorage.setItem('cart', JSON.stringify(newDataCart));
    }

    const decrement = (index) => {
        const newDataCart = dataCart.slice();
        const currentCount = dataCart[index].quantity;
        if (!currentCount || currentCount == 1) {
            newDataCart.splice(index, 1);
        } else {
            newDataCart[index].quantity = newDataCart[index].quantity - 1;
        }
        setDataCart(newDataCart);
        AsyncStorage.setItem('cart', JSON.stringify(newDataCart));
    }

    if (dataCart.length === 0)
        return (
            <View style={styles.root}>
                <Text style={styles.header}>Cart food</Text>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text>
                        Вы пока ничего не добавили в корзину
                    </Text>
                </View>
            </View>
        );

    return (
        <View style={styles.root}>
            <Text style={styles.header}>Cart food</Text>

            <ScrollView>
                <View style={styles.foodsContent}>
                    {
                        dataCart.map((item, index) => {
                            return (<View style={styles.item}>
                                <Image resizeMode="contain" style={styles.image} source={{ uri: item?.food?.image }} />
                                <View style={styles.food}>
                                    <View>
                                        <Text style={styles.foodTitle}>{item?.food?.name}</Text>
                                        <Text>Description de food</Text>
                                    </View>
                                    <View style={styles.foodContent}>
                                        <Text style={styles.price}>${item.price * item?.quantity}</Text>
                                        <View style={styles.foodButtons}>
                                            <TouchableOpacity onPress={decrement.bind(null, index)}>
                                                <Icon name="ios-remove-circle" size={30} color={THEME.ACTIVE_COLOR} />
                                            </TouchableOpacity>
                                            <Text style={{ paddingHorizontal: 8, fontWeight: 'bold' }}>{item.quantity}</Text>
                                            <TouchableOpacity onPress={increment.bind(null, index)}>
                                                <Icon name="ios-add-circle" size={30} color={THEME.ACTIVE_COLOR} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            )
                        })
                    }
                </View>


                {/* Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.btnCheckout}
                        onPress={() => { }}
                    >
                        <Text style={styles.btnCheckoutText}>Checkout</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        //borderWidth: 3,
        //borderColor: 'yellow'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: THEME.ACTIVE_COLOR
    },
    foodsContent: {
        flex: 1,

        //borderWidth: 2,
        //borderColor: 'orange'
    },
    item: {
        flexDirection: 'row',
        width: width - 20,
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        backgroundColor: 'transparent',

        //borderWidth: 1,
        //borderColor: 'blue'
    },
    image: {
        width: width / 3,
        height: width / 3
    },
    food: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,

        //borderWidth: 1,
        //borderColor: 'red'
    },
    foodTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    foodContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    foodButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME.ACTIVE_COLOR
    },

    footer: {
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: 'white'
    },
    btnCheckout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: (width / 2) - 40,
        padding: 4,
        borderRadius: 5,
        backgroundColor: '#33c37d'
    },
    btnCheckoutText: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white'
    }
});
