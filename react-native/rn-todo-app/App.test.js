import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { fireEvent, render, wait } from '@testing-library/react-native';
require('snapshot-diff/extend-expect');
//const snapshotDiff = require('snapshot-diff');

import App from "./App";
import toJson from 'enzyme-to-json';

test("test entering todos", async () => {
    const { getByTestId, queryAllByTestId, asJSON, debug, getAllByTestId} = render(<App />);
    const firstRender = asJSON();
    const todoStrings = ["todow one", "todo two", "todo three"];

    const input = getByTestId('addtodo-input');
    expect(input).not.toBeNull();

    const button = getByTestId('addtodo-button');
    expect(input).not.toBeNull();

    todoStrings.forEach(todoString => {
        fireEvent.changeText(input, todoString);
        fireEvent.press(button);
    });

    const seachedTodos = getAllByTestId('todo-title');
    expect(seachedTodos.length).toBe(3);

    todoStrings.forEach((todoString, index) => 
        expect(seachedTodos[index].props.children).toBe(todoStrings[index])
    );
    //console.log(debug());
    //const lastRender = asJSON();
    //expect(firstRender).toMatchDiffSnapshot(lastRender);
});

/* test("test entering todos", async () => {
    const setTodosMock = jest.fn();
    const { getByTestId, queryAllByTestId, asJSON, debug, getAllByTestId } = render(<App />);
    const todoStrings = ["todow one", "todo two", "todo three"];

    const input = getByTestId('addtodo-input');
    expect(input).not.toBeNull();

    const button = getByTestId('addtodo-button');
    expect(input).not.toBeNull();

    todoStrings.forEach(todoString => {
        fireEvent.changeText(input, todoString);
        fireEvent.press(button);
    });

    expect(setTodosMock).toBeCalledTimes(3);

}); */