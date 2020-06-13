import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Input from './Input';

/**
 * Setup function for app component.
 * //@returns {ShallowWrapper}
 */
const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={ [success, jest.fn()] }>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {

  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: "en", secretWord: null, success: null});
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe("Submit");
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ language: "emoji", secretWord: null, success: null});
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe("🚀");
  });

  test('', () => {

  });
  
});

test("input component does not show when success is true", () => {
  const wrapper = setup({ language: null, secretWord: "party", success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});

test('Input renders without error', () => {
  const wrapper = setup({ language: null, secretWord: null, success: false });
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' } );
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({ language: null, secretWord: null, success: false });
  });
  test('state updates with value of input box upon change',() => { 
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click',() => { 
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });

});

describe('state controlled input field', () => {

});