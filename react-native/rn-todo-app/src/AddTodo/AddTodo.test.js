import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../tests/testUtils";

import { AddTodo } from "./AddTodo";

/* import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";


Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
}); */

/********************** END FOR MOUNT *************/

const defaultProps = {
    onSubmit: jest.fn()
};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    const wrapper = /* mount */shallow(<AddTodo {...setupProps}/>);       

    return wrapper;
};

describe("AddTodo component renders without error", () => {

    test("AddTodo component exists", () => {
        const wrapper = setup();
        const addTodoComponent = findByTestAttr(wrapper, 'addtodo-component'); //console.log(addTodoComponent.debug());
        expect(addTodoComponent.length).toBe(1);
    });

    test("Input exists", () => {
        const wrapper = setup();
        const addTodoInput = findByTestAttr(wrapper, 'addtodo-input');
        expect(addTodoInput.exists()).toBe(true);
    });
    test("Button exists", () => {
        const wrapper = setup();
        const addTodoButton = wrapper
            .find('Button')
            .findWhere(w => w.prop('testID') === "addtodo-button")
            .first(); 
        expect(addTodoButton.length).toBe(1);
    });
});

test("deos not throw warning with expected props", () => {
    checkProps(AddTodo, defaultProps);
});

describe("state controlled input field", () => {
    
    let setValueMock = jest.fn();
    let wrapper;
    beforeEach(() => {
        setValueMock.mockClear();
        React.useState = jest.fn(() => ["some todo", setValueMock]);
        wrapper = setup();
    });

    afterAll(() => {
        
    });

    test("state updates with value of input box upon change", () => {
        const addTodoInput = wrapper.find('TextInput').first();
        //console.log(addTodoInput.debug());
        //console.log('props', addTodoInput.props());
        addTodoInput.props().onChangeText("dasha");

        expect(setValueMock).toHaveBeenCalledWith("dasha");
    });

    //Work
    test("field is cleared up sumbit button click", () => {
        const addTodoButton = wrapper
            .find('Button')
            .findWhere(w => w.prop('testID') === "addtodo-button")
            .first();
        
        expect(addTodoButton.exists()).toBe(true);
        addTodoButton.props().onPress();
        expect(setValueMock).toHaveBeenCalledWith("");
    });

});
