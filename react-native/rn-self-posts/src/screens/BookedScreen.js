import React from "react";
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { DATA } from "../data";
import { Post } from "../components/Post";

export const BookedScreen = ({ navigation }) => {
    navigation.setOptions(options);
    const handlerOpenPost = (post) => {
        navigation.navigate("Post", {
            postId: post.id,
            date: post.date,
        });
    };
    const bookedPosts = useSelector(state => state.post.bookedPosts);

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={bookedPosts}
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
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title="Take photo"
                //iconName={Platform.OS ==='android' ? "camera" : "ios-camera"}
                iconName="ios-menu"
                onPress={() => console.log("press menu")}
            />
        </HeaderButtons>
    ),
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    post: {
        color: "black",
    },
});