import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import {  StatusBar } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import BottomNavigator from './AppBottomNavigator';
import { defaultScreenOptions,  defaultTheme } from './AppNavigationTheme';
import { THEME } from '../theme';

const Main = createStackNavigator();
const Login = createStackNavigator();

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor={THEME.MAIN_COLOR} />
            <NavigationContainer theme={defaultTheme}>
                <MainMenu />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

function MainMenu() {
    const { authenticated } = useSelector(state => state.auth);
    return (
        <Main.Navigator
            initialRouteName={authenticated ? "MainBottom" : "MainLogin"}
        >
            <Main.Screen
                options={defaultScreenOptions}
                name="MainLogin" component={LoginNavigator}
            />

            <Main.Screen
                options={defaultScreenOptions}
                name="MainBottom" component={BottomNavigator}
            />
        </Main.Navigator>
    );
}

function LoginNavigator() {
    return (
        <Login.Navigator>
            <Login.Screen name="Main" component={MainScreen} />
            <Login.Screen name="Login" component={LoginScreen} />
        </Login.Navigator>
    );
}