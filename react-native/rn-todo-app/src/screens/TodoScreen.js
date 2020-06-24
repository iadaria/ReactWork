import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from "../theme";

import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
    const { todos, removeTodo, updateTodo } = React.useContext(TodoContext);
    const { todoId, changeScreen } = React.useContext(ScreenContext);
    const [modal, setModal] = React.useState(false);

    const todo = todos.find(t => t.id === todoId);
    
    const handleSave = async title => {
        await updateTodo(todo.id, title);
        setModal(false);
    }

    return (
        <View>
            <EditModal 
                value={todo.title} 
                visible={modal} 
                onCancel={setModal} 
                onSave={handleSave}
            />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.GREY_COLOR}
                        onPress={() => changeScreen(null)}
                    >
                        <AntDesign name='back' size={20} color="#fff"/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name='remove' size={20}/>
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 15,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        //width: Dimensions.get('window').width / 3 ,
        //width: Dimensions.get('window').width > 400 ? 150 : 100,
        width: '40%'
    },
    title: {
        fontSize: 26,
    },
});
