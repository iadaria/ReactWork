import React from "react";
import { View, Modal, Button, TextInput, StyleSheet, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = React.useState(value);

    const handleSaveTitle = () => {
        if (title.trim().length < 3) {
            Alert.alert(
                'Ошибка', 
                `Минимальная длина названия 3 символа. Вы ввели ${title.trim().length} символов`
            );
        } else {
            onSave(title);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Введите название"
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={65}
                />
                <View style={styles.buttons}>
                    <AppButton
                        onPress={() => onCancel(false)}
                        color={THEME.DANGER_COLOR}
                    >
                        Отменить
                    </AppButton>
                    <AppButton onPress={handleSaveTitle}>
                        Сохранить
                    </AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1, //all window heigh
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%",
    },
    buttons: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
