import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

export default function AppNavigator() {

    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    )

}
