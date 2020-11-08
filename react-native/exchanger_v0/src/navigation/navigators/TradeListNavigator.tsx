import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TradeListScreen from '../../screens/TradeListScreen';


export default function TradeListNavigator() {

    const TradeList = createStackNavigator();
    return (
        <TradeList.Navigator>
            <TradeList.Screen name="TradeList" component={TradeListScreen} />
        </TradeList.Navigator>
    );
}


