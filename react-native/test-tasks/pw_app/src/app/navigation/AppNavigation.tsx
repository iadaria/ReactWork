import React from 'react';
import { 
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import NewTransactionScreen from '../../screens/NewTransactionScreen';
import TransactionsScreen from '../../screens/TransactionsScreen';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import merge from 'deepmerge';
import { defaultScreenOptions } from './defaultTheme';
  
  const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
  const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Main = createStackNavigator();
const Auth = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <RootSiblingParent>
            <NavigationContainer theme={CombinedDefaultTheme}>
                <MainMenu />
            </NavigationContainer>
        </RootSiblingParent>
    );
}

function MainMenu() {
    const { authenticated } = useSelector(state => state.auth);
    return (
        <Main.Navigator
            initialRouteName={
                authenticated ? "BottomTab" : "Authenticate"
            }
        >
            <Main.Screen
                name="Authenticate" component={AuthNavigator}
                
                options={{
                    //title: "Parrot Wings",
                    ...defaultScreenOptions
                }}
            />
            <Main.Screen
                name="BottomTab" component={BottomNavigation}
            />
        </Main.Navigator>
    );
}

function AuthNavigator() {
    return (
        <Auth.Navigator>
            <Auth.Screen name="Login" component={LoginScreen} />
            <Auth.Screen name="Register" component={RegisterScreen} />
        </Auth.Navigator>
    );
}

function BottomNavigation() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="NewTransaction"
                component={NewTransactionScreen}
                options={{
                    title: "Create a transaction"
                }}
            />

            <BottomTab.Screen
                name="Transactions"
                component={TransactionsScreen}
                options={{
                    title: "History"
                }}
            />

            <BottomTab.Screen
                name="Recipents"
                component={TransactionsScreen}
                options={{
                    title: "Recipients"
                }}
            />
        </BottomTab.Navigator>
    )
}
