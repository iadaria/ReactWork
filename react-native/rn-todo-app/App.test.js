import React from "react";
import { mount, shallow } from "enzyme";
/*import { findByTestAttr, checkProps, getCount } from "./tests/testUtils";
import toJson from "enzyme-to-json"; */

// Testing components
import App from "./App";
/* import { Todo } from "./src/Todo";
import { AddTodo } from "./src/AddTodo";
import { waitFor } from "react-native-testing-library";
 */
/*************** FOR MOUNT  ***********************/
//>install jsdom
//>react-test-renderre
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM(/* ``, { url: "http://localhost"} */);
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
/*************** END MOUNT  ***********************/

//const onSubmit = jest.fn();
const setup = () => {
    //onSubmit.mockClear();
    return /* shallow */mount(<App />); //console.log(wrapper.debug());
};

describe("test renders after enter todos", () => {
    let wrapper;
    
    beforeEach(() => {
        //wrapper = setup();
    });

    test("success count of todos", () => {
        const wrapper = mount(<App />);
        
        const todos = ["todo one", "todo two"];

        const addTodoInput = wrapper
            .find('TextInput')
            .findWhere(node => node.prop('testID') === 'addtodo-input')
            .first();
        expect(addTodoInput.exists()).toBe(true);
        
        const addTodoButton = wrapper
            .find('Button')
            .findWhere(node => node.prop('testID') === 'addtodo-button')
            .first();;
        expect(addTodoButton.exists()).toBe(true);
        
        addTodoInput.props().onChangeText("todo one");
        wrapper.update();
        addTodoButton.props().onPress();
        /* todos.map(todo => {
            addTodoInput.props().onChangeText(todo);
            addTodoButton.props().onPress();
        }); */

        const todoComponents = wrapper
            .findWhere(node => node.prop('testID') === 'todo-list')
            .first();
        //console.log('count = ', todoComponents.length);
        console.log('addTodos debug', todoComponents.debug());
        //console.log(toJson(wrapper, { noKey: false, mode: 'deep'}));
    });
});
/* 
describe("test entered words", () => {
    let wrapper;
    let setTodosMock = jest.fn();

    beforeEach(() => {
        setTodosMock.mockClear();
        React.useState[0] = jest.fn(() => [ [], setTodosMock ]);
        wrapper = setup();
        //let count = getCount(wrapper);
        //console.log(`count = ${count}`);
    });

    test("success execute `onSumbmit`", () => {
        let todos = ["todo one", "todo two"];

        const addTodoInput = wrapper
            .find('TextInput')
            .findWhere(node => node.prop('testID') === 'addtodo-input')
            .first();
        expect(addTodoInput.exists()).toBe(true);
        
        const addTodoButton = wrapper
            .find('Button')
            .findWhere(node => node.prop('testID') === 'addtodo-button')
            .first();;
        expect(addTodoButton.exists()).toBe(true);
        
        todos.map(todo => {
            addTodoInput.props().onChangeText(todo);
            addTodoButton.props().onPress();
        });

        expect(setTodosMock).toBeCalledWith({
            '1': { id: "", title: "todo one" },
            '2': { id: "", title: "todo two" }
        }); 
    });
}); */
