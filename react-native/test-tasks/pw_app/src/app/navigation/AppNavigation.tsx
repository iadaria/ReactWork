import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import NewTransactionScreen from '../../screens/NewTransactionScreen';
import TransactionsScreen from '../../screens/TransactionsScreen';

const Main = createStackNavigator();
const Auth = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <MainMenu />
        </NavigationContainer>
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
