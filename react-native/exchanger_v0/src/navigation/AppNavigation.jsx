import React from 'react';
import { StatusBar, Linking } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { THEME } from '../theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../app/common/components/ui/AppHeaderIcon';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import UnauthScreen from '../screens/UnauthScreen';
import DealsScreen from '../screens/DealsScreen';
import TradeListScreen from '../screens/TradeListScreen';
import PersonalAdsScreen from '../screens/PersonalAdsScreen';
import PersonalCabinetScreen from '../screens/PersonalCabinetScreen';
import ErrorToast from '../app/common/components/AppToast';

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
            <StatusBar barStyle="light-content" backgroundColor={THEME.MAIN_COLOR} />
            <NavigationContainer>
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
                options={defaultTabScreenOptions}
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

function BottomNavigator() {
    const { authenticated } = useSelector(state => state.auth);
    console.log('authenticated', authenticated);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#fff",
                showLabel: false,
                style: {
                    backgroundColor: THEME.MAIN_COLOR
                }
            }}
        >
            <Tab.Screen
                name="TabDeals"
                component={authenticated ? DealsNavigator : UnauthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="handshake" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="TabTradeList"
                component={TradeListNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="newspaper-variant-multiple-outline" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="TabPersonalAds"
                component={authenticated ? PersonalAdsNavigator : UnauthNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="card-account-details-outline" color={color} size={27} />
                    ),
                }}
            />
            <Tab.Screen
                name="TabPersonalCabinet"
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
        <Deals.Navigator>
            <Deals.Screen name="Deals" component={DealsScreen} />
            {/* <Deals.Screen name="Else in this part navigation" component={theOther} /> */}
        </Deals.Navigator>
    );
}

function TradeListNavigator() {
    return (
        <TradeList.Navigator>
            <TradeList.Screen name="TradeList" component={TradeListScreen} />
        </TradeList.Navigator>
    );
}

function PersonalAdsNavigator() {
    return (
        <PersonalAds.Navigator>
            <PersonalAds.Screen name="PersonalAds" component={PersonalAdsScreen} />
        </PersonalAds.Navigator>
    );
}

function PersonalCabinetNavigator() {
    return (
        <PersonalCabinet.Navigator>
            <PersonalCabinet.Screen name="PersonalCabinet" component={PersonalCabinetScreen} />
        </PersonalCabinet.Navigator>
    );
}

function UnauthNavigator() {
    return (
        <Unauth.Navigator>
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
                onPress={() => {
                    Linking.openURL(`http://t.me/${THEME.TELEGRAM_COMMON_GROUP}`)
                        .catch(error => {
                            console.log('error when open telegram group', error);
                            ErrorToast(error.message)
                        });
                }}
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
