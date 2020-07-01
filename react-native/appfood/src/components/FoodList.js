import React from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";

//import { BoxShadow } from 'react-native-shadow';

let { height, width } = Dimensions.get("window");

export const FoodList = ({ food, selectedCategory, addToCart }) => {
    return (
        <View style={styles.root}>
            <FlatList
                nestedScrollEnabled={true}
                numColumns={2}
                data={food}
                renderItem={({ item }) => _renderItemFood(item, selectedCategory, addToCart)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

function _renderItemFood(item, selectedCategory, addToCart) {
    
    if (selectedCategory && selectedCategory !== item.categorie) 
        return null;

    return (

        <TouchableOpacity
            style={[styles.divFood, { backgroundColor: item.color }]}
            onPress={addToCart.bind(null, item)}
        >
            <Image
                style={styles.imgFood}
                resizeMode="contain"
                source={{ uri: item.image }}
            />
            <Text style={styles.nameFood}>{item.name}</Text>
            <Text>Descp Food and Details</Text>
            <Text style={styles.price}>$ {item.price}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    root: {
        //backgroundColor: 'blue',
        alignItems: 'center'
    },
    divFood: {
        borderWidth: 3,
        borderColor: '#f2f2f2',

        alignItems: 'center',
        width: (width / 2) - 20,
        margin: 5,
        /*  marginTop: 55,
         marginBottom: 5,
         marginLeft: 10, */
        padding: 10,

        borderRadius: 5,
    },
    imgFood: {
        //borderWidth: 1,
        //borderColor: 'red',

        //position: 'absolute',
        //top: -45,

        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
    },
    nameFood: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    price: {
        fontSize: 20,
        color: 'green',
    }
});