import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from './ui/AppText';

export const Todo = ({ todo, onRemove, onOpen }) => {

    return (
        <TouchableOpacity
            activeOpacity={.5}
            onPress={() => onOpen(todo.id)}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View 
                testID="component-todo" //in browser <div data-testid="component-todo" />
                style={styles.todo}
            >
                {/*  in browser <div data-testid="todo-title" />*/}
                <AppText testID="todo-title">{todo.title}</AppText> 
            </View>
        </TouchableOpacity>
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
    }
});

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};