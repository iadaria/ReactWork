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

const CategoryList = ({ deviceWidth, city, selectCategory }) => {
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        setCategories(
            DATA.categories.filter(category => category.city_id === city)
        );
        console.log('set categories');
    }, []);

    return (
        <>
            <View style={styles.navbar}>
                <Text style={styles.navbarText}>Назад</Text>
                <Text style={styles.navbarText}>Help icon</Text>
            </View>
            <Text style={styles.categoryTitle}>Что желаете?</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => _renderCategory(item, deviceWidth, selectCategory)}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
};

function _renderCategory(item, deviceWidth, selectCategory) {
    const tempImg = "../store/data/img/coffee_cap.png";
    return (
        <TouchableOpacity 
            style={[
                styles.category,
            ]}
            onPress={selectCategory.bind(null, item.id)}
        >
            <Image

                resizeMode="cover"
                style={[
                    styles.categoryImage, 
                    { width: deviceWidth - 4, height: deviceWidth / 2.2, overflow: 'visible'}
                ]}
                source={require(tempImg)}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingVertical: 5,
    },
    navbarText: {
        fontWeight: 'bold',
        color: 'gray'
    },
    category: {
        borderWidth: 1,
        borderColor: 'green'
    },
    categoryImage: {
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
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    categoryName: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default CategoryList;
