import React from "react";
import { shallow } from "enzyme";
import { storeFactory } from "../test/testUtils";

import App from "./App";
import { getSecretWord } from "./actions";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {*} - return {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
};

describe("redux properties", () => {
  
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({ success }); console.log(wrapper.debug());
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
    
  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord }); 
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCound: 3 }];
    const wrapper = setup({ guessedWords }); 
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toBe(guessedWords);
  });

  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWord = wrapper.instance().props.getSecretWord;
    expect(getSecretWord).toBeInstanceOf(Function);
  });

});
