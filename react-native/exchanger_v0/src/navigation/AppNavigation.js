import React from 'react';
import { Platform } from 'react-native';

import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from "@react-navigation/drawer";

//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MainScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}