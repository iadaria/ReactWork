import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DealsScreen from '../../screens/DealsScreen';

export default function DealsNavigator(): JSX.Element {
    
    const Deals = createStackNavigator();
    return (
        <Deals.Navigator>
            <Deals.Screen name="Deals" component={DealsScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </Deals.Navigator>
    );
}