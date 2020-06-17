import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "react-native";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

console.log("executing setupTest.js....");
/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

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