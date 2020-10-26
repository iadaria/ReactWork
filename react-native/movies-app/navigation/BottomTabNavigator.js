import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MovieDetail from '../screens/MovieDetail';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from './ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import AuthLoadingScreen from '../screens/AuthLoading';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ 
                headerTitle: "Now playing"
            }}/>
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="AuthLoading">
            <Stack.Screen name="AuthLoading" component={AuthLoadingScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={({navigation}) => ({
                headerLeft: () => (
                    <Ionicons name="md-exit" size={25} color="#161616" 
                        style={{
                            position: 'relative',
                            left: 20,
                            zIndex: 8
                        }}
                        onPress={async() => {
                            await AsyncStorage.removeItem('token');
                            navigation.replace('Login');
                        }}
                    />
                )
            })}/>
        </Stack.Navigator>
    )
}

export default function BottomTabNavigator({ navigation, route }) {
   // navigation.setOptions({ headerTitle: getHeaderTitle(route )});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen 
                name="Home"
                component={HomeStack}
                options={{
                    title: 'Get Started'
                }}
            />
            <BottomTab.Screen 
                name="Links"
                component={ProfileStack}
                options={{
                    title: 'Resources'
                }}
            />

            {/* <BottomTab.Screen 
                name="Detail"
                component={MovieDetail}
                options={{
                    title: 'Resources'
                }}
            /> */}
        </BottomTab.Navigator>
    );
}