import React from "react";
import { View, Text, StyleSheet, Button, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import { AntDesign } from '@expo/vector-icons';
import { DATA } from "../data";
import { Post } from "../components/Post";

export const MainScreen = ({ navigation }) => {
    const handlerOpenPost = (post) => {
        navigation.navigate("Post", {
            postId: post.id,
            date: post.date,
        });
    };

    navigation.setOptions({
        ...options,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="Take photo"
                    //iconName={Platform.OS ==='android' ? "camera" : "ios-camera"}
                    iconName="ios-camera"
                    onPress={() => navigation.jumpTo('Create')}
                />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="Take photo"
                    iconName="ios-menu"
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    });

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => (
                    <Post post={item} onOpen={handlerOpenPost} />
                )}
            />
        </View>
    );
};

const options = {
    headerTitle: "Мой блог", 
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    post: {
        color: "black",
    },
});