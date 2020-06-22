import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../testUtils";

import { Todo } from "../../src/components/Todo";

/******************  Enzyme  ***************************/
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});
/******************  Enzyme end  ***************************/

const defaultProps = {
    todo: { id: "1", title: 'default_title' }
};

const setup = (props = {}, state = null) => {
    const setupProps = {...defaultProps, ...props};
    const wrapper = shallow(<Todo {...setupProps}/>);

    if (state) wrapper.setState(state);

    //console.log(wrapper.debug());
    return wrapper;
};

test("does not throw warning with expected props", () => {
    checkProps(Todo, defaultProps);
});

describe("renders without error", () => {

    test("Todo", () => {
        const wrapper = setup();
        const todoComponent = findByTestAttr(wrapper, 'component-todo', 'testID');
        expect(todoComponent.length).toBe(1);
    });
    
    test("display todo title 1", () => {
        const todo = { id: "1", title: "displayed_title"};
        const wrapper = setup({ todo });
        const titleTodo = findByTestAttr(wrapper, 'todo-title', 'testID');
        
        const test = wrapper.find('Text').findWhere(w => w.text() === "displayed_title").first();
        //const addTodoButton = wrapper.find('Button).findWhere((w) => w.text() === 'Add Todo').first();
        expect(test.text()).toEqual("displayed_title");
        
        
        const searchedTodoTitle = titleTodo.findWhere(w => w.text() === "displayed_title").first();
        const test3 = wrapper.findWhere(node => node.prop('testID') === 'todo-title');
        //console.log(test3.debug());
        expect(searchedTodoTitle.text()).toEqual("displayed_title");
    })
    test("display todo title 2", () => {
        const todo = { id: "1", title: "displayed_title"};
        const wrapper = setup({ todo });
        const todoComponent = findByTestAttr(wrapper, 'todo-title', 'testID');
        //console.log('data', todoComponent.first().props().children);
        expect(todoComponent.first().props().children).toEqual("displayed_title");
    })

});
