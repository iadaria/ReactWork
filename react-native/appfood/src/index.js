import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { FoodScreen } from './screens/FoodScreen';
import { CartScreen } from './screens/CartScreen';
import { AddressScreen } from './screens/AddressScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { THEME } from './theme';


let { height, width } = Dimensions.get("window");

console.disableYellowBox = true;


export default function App() {
    const [module, setModule] = React.useState(3);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [countFood, setCountFood] = React.useState(0);

    const screens = [
        <FoodScreen 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCountFood={setCountFood}
        />,
        <CartScreen />,
        <AddressScreen />,
        <ProfileScreen />
    ];
    const getColor = (curModule) => curModule !== module ? 'gray' : 'limegreen';

    return (
        <View style={styles.root}>
            {screens[module]}
            <View style={styles.bottomTab}>

                <TouchableOpacity style={styles.itemTab} onPress={() => setModule(0)}>
                    <Icon name="md-restaurant" size={30} color={getColor(0)} />
                    <Text>Food</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemTab} onPress={() => setModule(1)}>
                    <View>
                        <Icon name="md-basket" size={30} color={getColor(1)} />
                        {countFood !== 0 && 
                            <Badge 
                                status="success" 
                                value={`${countFood}+`}
                                containerStyle={{ position: 'absolute', top: -2, right: -7 }}    
                            />
                        }
                    </View>
                    <Text>Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemTab} onPress={() => setModule(2)}>
                    <Icon name="md-map" size={30} color={getColor(2)} />
                    <Text>Address</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemTab} onPress={() => setModule(3)}>
                    <Icon name="md-contact" size={30} color={getColor(3)} />
                    <Text>Profile</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,

        //borderWidth: 2,
        //borderColor: 'blue'
    },
    bottomTab: {
        //borderWidth: 2,
        //borderColor: 'blue',
        height: THEME.BOTTOM_BAR_HEIGHT,
        width: width,
        //backgroundColor: 'cadetblue',
        //opacity: 0.8,
        flexDirection: 'row'
    },
    itemTab: {
        width: width / 4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

});