import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSelector } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UnauthScreen from '../screens/UnauthScreen';
import DealsScreen from '../screens/DealsScreen';
import TradeListScreen from '../screens/TradeListScreen';
import PersonalAdsScreen from '../screens/PersonalAdsScreen';
import PersonalCabinetScreen from '../screens/PersonalCabinetScreen';
import { THEME } from "../theme";
import { defaultTabScreenOptions } from "./AppNavigationTheme";

const Tab = createBottomTabNavigator();
const Deals = createStackNavigator();
const TradeList = createStackNavigator();
const PersonalAds = createStackNavigator();
const PersonalCabinet = createStackNavigator();
const Unauth = createStackNavigator();

import HttpService from '../app/api/HttpService';
import { getInfoConnectedRef, getUserUidRef, updateUserAppState } from '../app/firestore/firebaseService';
import firebase from '../app/config/firebase';
import { getColorText } from '../app/common/utils/utils';

export default function BottomNavigator() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const { authenticated, currentUser } = useSelector((state) => state.auth);
    console.info('[BottomNavigator] authenticated', authenticated);

    const httpService = new HttpService();
    
    const test1 = useCallback(
        async () => {
            if (authenticated) {
                await httpService.sendMessageToTelegramBot(`[useEffect] user ${currentUser.displayName} online`)
            }
        },
        [authenticated, currentUser.displayName]
    )
    const test2 = useCallback(
        async () => {
            if (authenticated) {
                await httpService.sendMessageToTelegramBot(`[useEffect] user ${currentUser.displayName} offline`)
            }
        },
        [authenticated, currentUser.displayName]
    )

    const initAppState = useCallback( async() => await updateUserAppState("foreground"), [authenticated]);

    useEffect(() => {
        if (authenticated) {
            initAppState();
            AppState.addEventListener("change", _handleAppStateChange);
            AppState.addEventListener(
                "memoryWarning", 
                () => console.log(getColorText("Device running out of memory!", "", "cyan"))
            );
        }
        return () => AppState.removeEventListener("change", _handleAppStateChange);
    }, [authenticated]);

    useEffect(() => {
        console.log(`[BottomNavigator/useEffect] dep [authenticated] was executed ${authenticated}`);
        test1()

        return () => {
            test2();
        }
    }, [authenticated]);

    useEffect(() => {
        if (authenticated) {
            console.log('App -> useEffect -> authenticated is true');
            const isOfflineForDatabase = {
                state: "offline",
                lastChangedState: firebase.database.ServerValue.TIMESTAMP
            };
            const isOnlineForDatabase = {
                state: "online",
                lastChangedState: firebase.database.ServerValue.TIMESTAMP
            };
            getInfoConnectedRef().on('value', async (snapshot) => {
                if (!snapshot.exists()) {
                    await httpService.sendMessageToTelegramBot(`[.info/connected] user ${currentUser.displayName} offline`)
                    return;
                }
                getUserUidRef().onDisconnect().update(isOfflineForDatabase).then( async () => {
                    getUserUidRef().update(isOnlineForDatabase);
                    await httpService.sendMessageToTelegramBot(`[.info/connected] user ${currentUser.displayName} online`)
                });
            });

            /* This is send messages when last_change date was changed is very ofent
                getUserUidRef().on('value', async (snapshot) => {
                if (!snapshot.exists()) return;
                const val = snapshot.val();
                const data = JSON.stringify({
                    state: val.state,
                    last_changed: new Date(val.last_changed).toLocaleString()
                });
                await httpService.sendMessageToTelegramBot(`[database users/{uid}] ${data}`);
            }); */
        }
        return () => {
            //getInfoConnectedRef().off(); offline don't will executed
        }
    }, [authenticated, currentUser]);

    //Sample Expo Notification
    useEffect(() => {
        //registerForNotificatioins();
        /* Notification.addListener(notification => {
            const { data: { text } } = notification;

            if (origin === 'received' && text)  {
                const text = notification.data.text;
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{ text: 'Ok.'}]
                )
            }
        }) */
    }, []);

    async function _handleAppStateChange(nextAppState) {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            console.log(getColorText("App has come to the +foreground. nextAppState", nextAppState, "cyan"));
            await updateUserAppState("foreground");
        } else {
            console.log(getColorText("App has come to the -background. nextAppState", nextAppState, "cyan"));
            await updateUserAppState("background");
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log(getColorText("AppState", appState, "cyan"));
    }

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