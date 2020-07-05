import React, { useEffect } from 'react';
import { DATA } from '../store/data';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

const Product = ({item, deviceWidth, setSum}) => {
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        AsyncStorage.setItem('order', JSON.stringify(0));
    }, []);

    const tempImg = "../store/data/img/coffee_americano.png";

    const addToCart = (price, count) => {
        console.log('');
        console.log(`will be added price = ${price} and count = ${count}`);
        let sum;
        AsyncStorage.getItem('order').then(order => {
            if (order !== null) {
                sum = Number(JSON.parse(order)); console.log('after parse from repo', sum);
                sum = sum + price * count;
                AsyncStorage.setItem('order', JSON.stringify(sum));
                console.log('current sum is ', sum);
                setSum(sum);
            } else {
                sum = 0;
                sum = sum + price * count;
                AsyncStorage.setItem('order', JSON.stringify(sum)); console.log('sum after create', sum);
                console.log('current sum is ', sum);
                setSum(sum);
            }
        });
    };
    
    return (
        <TouchableOpacity
            style={[
                styles.product,
            ]}
        >
            <Image

                resizeMode="cover"
                style={[
                    styles.productImage,
                    { width: deviceWidth / 2 - 14, height: deviceWidth / 2.2, overflow: 'visible' }
                ]}
                source={require(tempImg)}
            />
            <View style={styles.description}>
                <View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={{ color: 'gray' }}>{item.price} $</Text>
                </View>
                <View style={{width: 80}}>
                    <Picker
                        //itemStyle={{borderWidth: 1, borderColor: 'blue'}}
                        //mode="dropdown"
                        selectedValue={count}
                        onValueChange={(itemValue, itemIndex) => {
                            setCount(Number(itemValue));
                            addToCart(item.price, itemValue);                 
                        }}
                    >
                        {[0, 1, 2, 3].map( item => 
                            <Picker.Item 
                                key={item} 
                                label={item.toString()} value={item} 
                            />
                        )}
                    </Picker>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
        //borderWidth: 1,
        //borderColor: 'green'
    },
    productImage: {
        overflow: 'visible',
        marginTop: 20,
        borderRadius: 10,

        //borderWidth: 1,
        //borderColor: 'red'
    },
    description: {
        flexDirection: 'row',
        padding: 5
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default Product;