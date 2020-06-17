import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddTodo";
import { Todo } from "./src/Todo";

export default function App() {
    const [todos, setTodos] = React.useState([]);

    const addTodo = (title) => {
        setTodos(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                title
            } 
        ]);
    };

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container} testID="app">
                <AddTodo onSubmit={addTodo}/>
                <View testID="todo-list">
                    { todos.map(todo => {
                        console.log(todo);
                        return <Todo key={todo.id} todo={todo} />
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        /* borderColor: 'black',
    borderWidth: 2, */
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
});
