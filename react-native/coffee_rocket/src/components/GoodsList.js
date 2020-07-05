import React, { useEffect } from 'react';
import { DATA } from '../store/data';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
} from "react-native";
import Product from './Product';
import AsyncStorage from '@react-native-community/async-storage';

const GoodsList = ({ deviceWidth, city, category, back }) => {
    const [goods, setGoods] = React.useState(null);
    const [sum, setSum] = React.useState(null);

    useEffect(() => {
        setGoods(
            DATA.goods.filter(good =>
                good.city_id === city && good.category_id === category)
        );
    }, []);
  
    useEffect(() => {
        console.log('lunch useEffect get order');
        AsyncStorage.getItem('order').then(order => {
            if (order !== null) {
                const _sum = Number(JSON.parse(order));
                setSum(_sum);
            }
        });
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
            <View style={{ justifyContent: 'space-between' }}>
                <FlatList
                    numColumns={2}
                    data={goods}
                    renderItem={
                        ({ item, index }) => <Product item={item} deviceWidth={deviceWidth} setSum={setSum} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            </View>
            <View style={{ 
                height: 60, width: '50%', backgroundColor: 'cadetblue',
                position: 'absolute', bottom: 20, alignSelf: 'center',
                borderRadius: 10, opacity: 0.8
            }}>
            <View style={{alignContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 5, textAlign: 'center', marginTop: 12}}>
                    Заказ X за {sum} грн.
                </Text>
            </View>
        </View>
        </>
    );
};


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
    goodsTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
});


export default GoodsList;
