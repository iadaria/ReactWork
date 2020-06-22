import React from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import { THEME } from "./src/theme";

async function loadApplication() {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require("./assets/fonts/Roboto-Bold.ttf"),
    });
};

export default function App() {
    const [isReady, setIsReady] = React.useState(false);
    const [todoId, setTodoId] = React.useState(null);
    const [todos, setTodos] = React.useState([
        /* { id: "1", title: "Research react native" },
        { id: "2", title: "Develop program" }, */
    ]);

    if (!isReady) {
        //console.log('isReady', isReady);
        return (
            <AppLoading 
                startAsync={loadApplication} 
                onError={err => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        );
    }
    //console.log('isReady', isReady);

    const addTodo = (title) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title,
            },
        ]);
    };

    const handleRemoveTodo = (id) => {
        const todoForRemove = todos.find(t => t.id === id);
        Alert.alert(
            "Удаление элемента",
            `Вы уверены, что хотите удалить ${todoForRemove.title}?`,
            [
                {
                    text: "Отмена",
                    style: "cancel",
                },
                { 
                    text: "Удалить", 
                    style: "destructive",
                    onPress: () => {
                        setTodoId(null);
                        setTodos((prev) => prev.filter((todo) => todo.id != id));
                    } },
            ],
            { cancelable: false }
        );
    };

    const handleSaveTodo = (id, title) => {
        setTodos(old => old.map(todo => {
            if (todo.id === id) { todo.title = title; }
            return todo;
        }));
    };

    let content = todoId ? (
        <TodoScreen
            todo={todos.find((todo) => todo.id === todoId)}
            goBack={() => setTodoId(null)}
            onRemove={handleRemoveTodo}
            onSave={handleSaveTodo}
        />
    ) : (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            onRemove={handleRemoveTodo}
            openTodo={setTodoId}
        />
    );

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container} testID="app">
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        /* borderColor: 'black',
        borderWidth: 2, */
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
