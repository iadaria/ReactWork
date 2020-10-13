import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
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

import HttpService from '../app/services/HttpService';
import { getInfoConnectedRef, getUserUidRef, updateUserAppState, updateUserToken } from '../app/firestore/firebaseService';
import firebase from '../app/config/firebase';
import { getColorText } from '../app/common/utils/utils';

import messaging from '@react-native-firebase/messaging';

export default function BottomNavigator() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const { authenticated, currentUser } = useSelector((state) => state.auth);
    console.info('[BottomNavigator function] authenticated', authenticated);

    const httpService = new HttpService();
    // Send message to telegram if user is online
    const test1 = useCallback(
        async () => {
            if (authenticated) {
                await httpService.sendMessageToTelegramBot(`[useEffect] user ${currentUser.displayName} online`)
            }
        },
        [authenticated, currentUser]
    );
    // Send message to telegram if user is offline 
    const test2 = useCallback(
        async () => {
            if (authenticated) {
                await httpService.sendMessageToTelegramBot(`[useEffect] user ${currentUser.displayName} offline`)
            }
        },
        [authenticated, currentUser]
    )
    const initAppState = useCallback( async() => await updateUserAppState("foreground"), [authenticated]);

    /************************************ UseEffect ****************************************/
    // Recieved push notification
    useEffect(() => {
        let unsubscribe = () => {};
        if (authenticated) {
            unsubscribe = messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            });
            messaging().getToken()
                .then(async token => await updateUserToken(token) )
                .catch(err => console.log(getColorText("error update Token", err, "red")));
        }
        return async () => {
            unsubscribe();
            await messaging().onTokenRefresh( async token => await updateUserToken(token));
        }
    }, []);
    
    // State background or foreground
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

    // For send message to telegram about online or offline
    useEffect(() => {
        console.log(`[BottomNavigator/useEffect] dep [authenticated] was executed ${authenticated}`);
        test1()

        return () => {
            test2();
        }
    }, [authenticated]);

    // Subscribe to Firebase about user change state offline / online
    useEffect(() => {
        if (authenticated) {
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
                    await httpService.sendMessageToTelegramBot(
                        `[.info/connected] user ${currentUser.displayName} offline`
                    );
                    return;
                }
                getUserUidRef().onDisconnect().update(isOfflineForDatabase).then( async () => {
                    getUserUidRef().update(isOnlineForDatabase)
                    await httpService.sendMessageToTelegramBot(`[.info/connected] user ${currentUser.displayName} online`)
                });
            });
        }
        return () => {
            //getInfoConnectedRef().off(); offline don't will executed
        }
    }, [authenticated, currentUser]);

    // Change state user in Firebase -  background / foreground
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

// //Sample Expo Notification
// useEffect(() => {
//     //registerForNotificatioins();
//     /* Notification.addListener(notification => {
//         const { data: { text } } = notification;

//         if (origin === 'received' && text)  {
//             const text = notification.data.text;
//             Alert.alert(
//                 'New Push Notification',
//                 text,
//                 [{ text: 'Ok.'}]
//             )
//         }
//     }) */
// }, []);

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