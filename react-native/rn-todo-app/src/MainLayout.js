import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { TodoScreen } from './screens/TodoScreen';
import { MainScreen } from './screens/MainScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = () => {
    const todosContext = React.useContext(TodoContext);
    const [todoId, setTodoId] = React.useState(null);
    const [todos, setTodos] = React.useState([]);

    const handleAddTodo = (title) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                title,
            },
        ]);
    };

    const handleRemoveTodo = (id) => {
        const todoForRemove = todos.find((t) => t.id === id);
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
                        setTodos((prev) =>
                            prev.filter((todo) => todo.id != id)
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleSaveTodo = (id, title) => {
        setTodos((old) =>
            old.map((todo) => {
                if (todo.id === id) {
                    todo.title = title;
                }
                return todo;
            })
        );
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
            todos={todosContext.todos}
            addTodo={handleAddTodo}
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
    )
};

const styles = StyleSheet.create({
    container: {
        /* borderColor: 'black',
        borderWidth: 2, */
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
