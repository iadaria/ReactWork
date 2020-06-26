import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { Post } from "../components/Post";
import { loadPosts } from "../store/actions/post";
//import { AntDesign } from '@expo/vector-icons';
//import { DATA } from "../data";

export const MainScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    const allPosts = useSelector(state => state.post.allPosts);

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
                data={allPosts}
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