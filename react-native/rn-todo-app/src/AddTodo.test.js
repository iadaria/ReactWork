import React from "react";
//import Enzyme from "enzyme";
import { mount } from "enzyme";
//import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr, checkProps } from "../tests/testUtils";

import { AddTodo } from "./AddTodo";

/* import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
}); */

/* Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
}); */

const defaultProps = {
    onSubmit: jest.fn()
};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    const wrapper = mount(<AddTodo {...setupProps}/>);       

    //console.log(wrapper.debug());
    return wrapper;
};

describe("renders without error", () => {

    test("AddTodo component exists", () => {
        const wrapper = setup();
        console.log(wrapper.debug());
        const addTodoComponent = findByTestAttr(wrapper, 'component-addtodo');
        expect(addTodoComponent).toExist();
    });
});

test("deos not throw warning with expected props", () => {
    checkProps(AddTodo, defaultProps);
});