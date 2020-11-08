import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import MainScreen from "../../screens/MainScreen";

export default function LoginNavigator(): JSX.Element {

    const Login = createStackNavigator();
    return (
        <Login.Navigator>
            <Login.Screen name="Main" component={MainScreen} />
            <Login.Screen name="Login" component={LoginScreen} />
        </Login.Navigator>
    );
}