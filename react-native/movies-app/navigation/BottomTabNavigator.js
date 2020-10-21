import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MovieDetail from '../screens/MovieDetail';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
    //navigation.setOptions({ headerTitle: getHeaderTitle(route )});

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Get Started'
                }}
            />
            <BottomTab.Screen 
                name="Links"
                component={LinksScreen}
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

