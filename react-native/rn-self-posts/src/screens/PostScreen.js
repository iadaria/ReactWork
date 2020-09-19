import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
    Alert,
} from "react-native";
import { THEME } from "../theme";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { toogleBooked, removePost } from "../store/actions/post";
//import { DATA } from "../data";

export const PostScreen = ({ navigation, route }) => {
    const { postId, date } = route.params;
    //console.log('navigation -> ', navigation);
    //console.log('route -> ', route);
    const dispatch = useDispatch();
    const post = useSelector((state) =>
        state.post.allPosts.find((_post) => _post.id === postId)
    );

    const handlerRemove = () => {
        Alert.alert(
            "Удаление поста",
            "Вы действительно хотите удалить этот пост?",
            [
                {
                    text: "Отмена",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Удалить",
                    onPress() {
                        navigation.navigate('Main');
                        dispatch(removePost(post.id));
                    },
                },
            ],
            { cancelable: false }
        );
    };

    navigation.setOptions({
        ...defaultOptions,
        headerTitle: `Пост от ${new Date(date).toLocaleDateString()}`,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="Book post"
                    iconName={
                        post && post.booked ? "ios-star" : "ios-star-outline"
                    }
                    onPress={() => {
                        dispatch(toogleBooked(post));
                    }}
                />
            </HeaderButtons>
        ),
    });

    if (!post) return null;

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: post.img }} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text.repeat(30)}</Text>
            </View>
            <View style={{ width: "30%", marginHorizontal: "35%" }}>
                <Button
                    onPress={handlerRemove}
                    title="Удалить"
                    color={THEME.DANGER_COLOR}
                />
            </View>
        </ScrollView>
    );
};

const defaultOptions = {};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: "open-regular",
        //fontFamily: 'OpenSans_400Regular'//Platform.OS === 'android' ? 'OpenRegular' : 'open-regular'
    },
});
