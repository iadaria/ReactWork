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


const GoodsList = ({deviceWidth, city, category, back }) => {
    const [goods, setGoods] = React.useState(null);

    useEffect(() => {
        setGoods(
            DATA.goods.filter(good => 
                good.city_id === city && good.category_id === category)
        );

        console.log('set goods');
    }, []);

    return (
        <>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={back}>
                    <Text style={styles.navbarText}>Назад</Text>
                </TouchableOpacity>
                <Text style={styles.navbarText}>Help icon</Text>
            </View>
            <Text style={styles.goodsTitle}>Кофейные напитки</Text>
            <View style={{ justifyContent: 'space-between'}}>
                <FlatList
                    numColumns={2}
                    data={goods}
                    renderItem={({ item }) => _renderProduct(item, deviceWidth)}
                    keyExtractor={(item, index) => index.toString()}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
            </View>
        </>
    );
};

function _renderProduct(item, deviceWidth) {
    const tempImg = "../store/data/img/coffee_americano.png";
    return (
        <TouchableOpacity 
            style={[
                styles.product,
            ]}
            //onPress={selectCategory.bind(null, item.id)}
        >
            <Image

                resizeMode="cover"
                style={[
                    styles.productImage, 
                    { width: deviceWidth / 2 - 14, height: deviceWidth / 2.2, overflow: 'visible'}
                ]}
                source={require(tempImg)}
            />
            <Text style={styles.productName}>{item.name}</Text>
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
    product: {
        borderWidth: 1,
        borderColor: 'green'
    },
    productImage: {
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
    goodsTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});


export default GoodsList;
