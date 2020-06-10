import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookAtions from './actions/hookActions';

const mockGetSecretWord  = jest.fn();

/**
 * Setup function for app component.
 * //@returns {ShallowWrapper}
 */
const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear(); // it is necessary
  hookAtions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ]);

  React.useReducer = mockUseReducer;

  // use mount, because useEffect not called on 'shallow'
  return mount(<App />); // for use effect it needs to use 'mount'
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // wrpapper.update() doesn't trigger update
    //(issue forked from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });

});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });

  test("does not renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(true);
  });

  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(false);
  });

});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test("does not renders app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.exists()).toBe(false);
  });

  test("does not render spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(true);
  });

});