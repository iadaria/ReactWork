import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { defaultTabScreenOptions } from '../defaultThemes';
import UnauthScreen from '../../screens/UnauthScreen';

export default function UnauthNavigator() {

    const Unauth = createStackNavigator();

    return (
        <Unauth.Navigator>
            <Unauth.Screen
                options={defaultTabScreenOptions} name="Unauth" component={UnauthScreen}
            />
        </Unauth.Navigator>
    );
}
