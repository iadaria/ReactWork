import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { THEME } from "../theme";
import { addPost } from "../store/actions/post";
import { PhotoPicker } from "../components/PhotoPicker";

export const CreateScreen = ({ navigation }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(undefined);
    const dispatch = useDispatch();
    const imgRef = useRef();

    const handlerCreatePost = () => {
        const post = {
            img: imgRef.current,
            text,
            date: new Date().toJSON(),
            booked: false,
        };

        dispatch(addPost(post));
        navigation.navigate("Main");
        setText("");
        imgRef.current = null;
        setImage(undefined);
    };

    const handlerPhotoPick = uri => {
        imgRef.current = uri;
        setImage(uri);
    }

    navigation.setOptions({
        headerTitle: "Создать пост",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title="main menu"
                    iconName="ios-menu"
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    });

    return (
        <ScrollView>
            {/* TouchableWithoutFeedback - if press for area out of keyboard, keyboard will close */}

            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        <Text style={styles.title}>Создай новый пост</Text>
                        <TextInput
                            value={text}
                            style={styles.textarea}
                            onChangeText={setText}
                            placeholder="Введите текст заметки"
                            multiline
                        />
                        <PhotoPicker image={image} onPick={handlerPhotoPick}/>
                        {/* <Image
                            style={{ width: "100%", height: 200, ...styles.image }}
                            source={{ uri: img }}
                        /> */}
                    </View>
                </TouchableWithoutFeedback>
                <Button
                    title="Создать пост"
                    color={THEME.MAIN_COLOR}
                    onPress={handlerCreatePost}
                    disabled={!text}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "open-regular",
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    },
    image: {
        marginBottom: 10,
    },
});
