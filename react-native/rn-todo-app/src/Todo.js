import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "react-native";

export const Todo = ({ todo }) => {

    return (
        <View 
            testID="component-todo" //in browser <div data-testid="component-todo" />
            style={styles.todo}
        >
            {/*  in browser <div data-testid="todo-title" />*/}
            <Text testID="todo-title">{todo.title}</Text> 
        </View>
    );
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    },
});

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};