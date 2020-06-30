import React from 'react';
import {
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
let { height, width } = Dimensions.get("window");


export const CategoryList = ({ categories, onSelect, selectedCategory }) => {
    /* console.log(
        `'selectedCategory from category' after render in ${Date.now()}`,
        selectedCategory
    ); */

    return (
        <View>
            <Text style={styles.title}>Categories {selectedCategory}</Text>
            <FlatList
                horizontal={true}
                data={categories}
                nestedScrollEnabled={true}
                renderItem={({item}) => _renderItem(item, onSelect)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

function _renderItem(item, onSelect) {
    return (
        <TouchableOpacity 
            style={[styles.divCategory, { backgroundColor: item.color }]}
            onPress={onSelect.bind(null, item.id)}
        >
            <Image 
                style={[ styles.imgCategory,{width: 100, height: 80}]}
                resizeMode="contain"
                source={{uri: item.image}}
            />
            <Text style={styles.tipCategory}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        width: width,
        paddingVertical: 20,
        backgroundColor: 'white',//'blue',
        borderRadius: 20,
        //borderWidth: 2,
        //borderColor: 'blue'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    divCategory: {
        margin: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    imgCategory: {
        //borderWidth: 1,
        //borderColor: 'red'
    },
    tipCategory: {
        //textAlign: 'center'
        fontSize: 22,
        fontWeight: 'bold'
    }
});