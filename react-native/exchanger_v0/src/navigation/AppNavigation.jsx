import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../app/common/components/AppHeaderIcon';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import UnauthScreen from '../screens/UnauthScreen';
import DealsScreen from '../screens/DealsScreen';
import TradeListScreen from '../screens/TradeListScreen';

const Main = createStackNavigator();
const Login = createStackNavigator();
const Deals = createStackNavigator();
const TradeList = createStackNavigator();
const PersonalAds = createStackNavigator();
const PersonalCabinet = createStackNavigator();
const Unauth = createStackNavigator();

let Tab = createBottomTabNavigator();
//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor={THEME.MAIN_COLOR}/> 
            <NavigationContainer>
                <MainMenu />
            </NavigationContainer>
        </SafeAreaProvider>
       
    );
}

function MainMenu() {
    return (
        <Main.Navigator initialRouteName="Main" screenOptions={defaultScreenOptions}>
            <Main.Screen name="Main" component={LoginNavigator} />
            <Main.Screen name="Bottom" component={BottomNavigator} />
        </Main.Navigator>
    );
}

function LoginNavigator() {
    return (
        <Login.Navigator
            initialRouteName="Unauth"
            // @ts-ignore
            //screenOptions={defaultScreenOptions}
        >
            <Login.Screen
                options={defaultScreenOptions} name="Main" component={MainScreen} 
            />

            <Login.Screen 
                options={defaultScreenOptions} name="Login" component={LoginScreen} 
            />
        </Login.Navigator>
    );
}

function BottomNavigator() {
    const { authenticated } = useSelector(state => state.auth);
    console.log('authenticated', authenticated);

    return (
        <Tab.Navigator
            initialRouteName="BottomNavigation"
            tabBarOptions={{
                activeTintColor: "#fff",
                showLabel: false,
                style: {
                    backgroundColor: THEME.MAIN_COLOR
                }
            }}
        >
            <Tab.Screen
                name="Сделки"
                component={authenticated ? DealsNavigator : UnauthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="handshake" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="Рынок"
                component={TradeListNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="newspaper-variant-multiple-outline" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="Мои объявления"
                component={authenticated ? PersonalAdsNavigator : UnauthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="card-account-details-outline" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="Личный кабинет"
                component={authenticated ? PersonalCabinetNavigator : UnauthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={27} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function DealsNavigator() {
    return (
        <Deals.Navigator
            initialRouteName="Deals"
            // @ts-ignore
            screenOptions={defaultTabScreenOptions}
        >
            <Deals.Screen name="Deals" component={DealsScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </Deals.Navigator>
    );
}

function TradeListNavigator() {
    return (
        <TradeList.Navigator
            initialRouteName="TradeList"
            // @ts-ignore
            screenOptions={defaultTabScreenOptions}
        >
            <TradeList.Screen name="TradeList" component={TradeListScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </TradeList.Navigator>
    );
}

function PersonalAdsNavigator() {
    return (
        <PersonalAds.Navigator 
            initialRouteName="PersonalAds"
            // @ts-ignore
            screenOptions={defaultTabScreenOptions}
        >
            <PersonalAds.Screen name="PersonalAds" component={TradeListScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </PersonalAds.Navigator>
    );
}

function PersonalCabinetNavigator() {
    return (
        <PersonalCabinet.Navigator
            initialRouteName="PersonalCabinet"
            // @ts-ignore
            screenOptions={defaultTabScreenOptions}
        >
            <PersonalCabinet.Screen name="PersonalCabinet" component={TradeListScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </PersonalCabinet.Navigator>
    );
}

function UnauthNavigator({ navigation }) {
    return (
        <Unauth.Navigator
            initialRouteName="Unauth"
            // @ts-ignore
            //screenOptions={defaultScreenOptions}
        >
            <Unauth.Screen 
                options={defaultTabScreenOptions} name="Unauth" component={UnauthScreen} 
            />
        </Unauth.Navigator>
    );
}


const defaultScreenOptions = {
    title: THEME.COMPANI_NAME,
    headerStyle: {
        backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: "#fff",
    headerTitleAlign: "center"
};

const defaultTabScreenOptions = {
    ...defaultScreenOptions,
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item 
                title="title"
                iconName="headphones"
                onPress={() => console.log('message')}
            />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item 
                title="title"
                iconName="bell-outline"
                onPress={() => console.log('message')}
            />
        </HeaderButtons>
    )
};

/* const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
}; */
