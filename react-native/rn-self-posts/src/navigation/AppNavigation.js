import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons /* , AntDesign */ } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { THEME } from "../theme";

const Post = createStackNavigator();
const Booked = createStackNavigator();
const About = createStackNavigator();
const Create = createStackNavigator();
let Tab;
if (Platform.OS === "android") {
    Tab = createMaterialBottomTabNavigator();
} else {
    Tab = createBottomTabNavigator();
}
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer
        //onStateChange={(state) => console.log("New state is ", state)}
        >
            {/* <BottomNavigator /> */}
            <MainMenu />
        </NavigationContainer>
    );
}

const BottomNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: THEME.MAIN_COLOR,
        }}
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        shifting={true}
    >
        <Tab.Screen
            name="Все"
            component={PostNavigator}
            options={{
                tabBarIcon: (info) => (
                    <Ionicons name="ios-albums" size={25} color={info.color} />
                ),
            }}
        />
        <Tab.Screen
            name="Избранное"
            component={BookedNavigator}
            options={{
                tabBarIcon: (info) => (
                    <Ionicons name="ios-star" size={25} color={info.color} />
                ),
            }}
        />
    </Tab.Navigator>
);

function MainMenu() {
    return (
        <Drawer.Navigator initialRouteName="PostTabs"
            drawerContentOptions={{ 
                activeTintColor: THEME.MAIN_COLOR,  
                labelStyle: {
                    fontFamily: 'open-bold'
                }
            }}
        >
            <Drawer.Screen
                name="PostTabs"
                component={BottomNavigator}
                options={{ drawerLabel: "Посты"/*, drawerIcon: () => <Ionicons name='ios-star'/> */}}
            />
            <Drawer.Screen
                name="About"
                component={AboutNavigator}
                options={{ drawerLabel: "О приложении" }}
            />
            <Drawer.Screen
                name="Create"
                component={CreateNavigator}
                options={{ drawerLabel: "Создать пост" }}
            />
        </Drawer.Navigator>
    );
}

function PostNavigator() {
    return (
        <Post.Navigator
            initialRouteName="Main"
            screenOptions={defaultNavigationOptions}
        >
            <Post.Screen name="Main" component={MainScreen} />
            {/* Post - сюда будем переключаться из Main */}
            <Post.Screen name="Post" component={PostScreen} /> 
        </Post.Navigator>
    );
}

function BookedNavigator() {
    return (
        <Booked.Navigator
            initialRouteName="Booked"
            screenOptions={defaultNavigationOptions}
        >
            <Booked.Screen name="Booked" component={BookedScreen} />
            {/* Post - сюда будем переключаться из Main */}
            <Booked.Screen name="Post" component={PostScreen} />
        </Booked.Navigator>
    );
}

function AboutNavigator() {
    return (
        <About.Navigator screenOptions={defaultNavigationOptions}>
            <About.Screen name="About" component={AboutScreen} />
        </About.Navigator>
    );
}

function CreateNavigator() {
    return (
        <Create.Navigator screenOptions={defaultNavigationOptions}>
            <Create.Screen name="Create" component={CreateScreen} />
        </Create.Navigator>
    );
}

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
};
