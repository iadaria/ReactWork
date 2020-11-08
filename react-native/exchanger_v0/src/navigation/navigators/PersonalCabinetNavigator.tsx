import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalCabinetScreen from '../../screens/PersonalCabinetScreen';


export default function PersonalCabinetNavigator(): JSX.Element {

    const PersonalCabinet = createStackNavigator();
    return (
        <PersonalCabinet.Navigator>
            <PersonalCabinet.Screen name="PersonalCabinet" component={PersonalCabinetScreen} />
        </PersonalCabinet.Navigator>
    );
}
