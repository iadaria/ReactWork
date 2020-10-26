import React, { useEffect } from 'react';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import NewTransactionScreen from '../../screens/NewTransactionScreen';
import TransactionsScreen from '../../screens/TransactionsScreen';
import {
    ActivityIndicator,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    IconButton
} from 'react-native-paper';
import merge from 'deepmerge';
import { defaultScreenOptions } from './defaultTheme';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken, signInUser } from '../../features/auth/authReducer';
import { IUserInfo } from '../models/user';
import { User } from '../services/agent';
import { asyncActionFinish, asyncActionStart } from '../../features/async/asyncReducer';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Main = createStackNavigator();
const Auth = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function AppNavigation() {
    const dispatch = useDispatch();
    const { id_token } = useSelector(state => state.auth);

    // One - when create App
    useEffect(() => {
        dispatch(asyncActionStart());
        getToken()
            .then((_id_token: string | null) => {
                _id_token && dispatch(setToken(_id_token));
                console.log("[useEffect/get AsyncStorage token]", {_id_token})
            })
        .catch(error => console.log("[useEffect getToken error", error))
        .finally(() => dispatch(asyncActionFinish()));
    }, []);

    // A few - When null, when not null, when id_token changed
    useEffect(() => {
        dispatch(asyncActionStart());
        if (id_token) {
            getUserInfo()
            .then((_user) => {
                _user && dispatch(signInUser(_user));
                console.log("[useEffect/get current user]", {_user})
            })
            .finally(() => dispatch(asyncActionFinish()));
        }
    }, [id_token]);

    const getToken = async (): Promise<string | null> => 
        await AsyncStorage.getItem('id_token');

    const getUserInfo = async(): Promise<IUserInfo | null> =>
        await User.current();

    return (

        <NavigationContainer theme={CombinedDefaultTheme}>
            <MainMenu />
        </NavigationContainer>
    );
}

function MainMenu() {
    const { authenticated } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.async);

    if (loading)  {
        return <ActivityIndicator style={styles.indicator} size="large" animating={true}/>;
    }
    
    return (
        <Main.Navigator
            initialRouteName={
                authenticated ? "BottomTab" : "Authenticate"
            }
        >
            <Main.Screen
                name="Authenticate" component={AuthNavigator}
                options={{
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
                    title: "Create a transaction",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="handshake" size={27}/>
                    )
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

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    }
});
