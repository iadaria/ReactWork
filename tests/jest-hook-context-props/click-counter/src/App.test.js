import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * 
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);

  return wrapper;
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test('render incement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDislay = findByTestAttr(wrapper, "counter-display");
  expect(counterDislay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  //find display and test value
  const counterDislay = findByTestAttr(wrapper, "counter-display");
  expect(counterDislay.text()).toContain(counter + 1);
});

test('clicking button decrement counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  //find display and test value
  const counterDislay = findByTestAttr(wrapper, "counter-display");
  expect(counterDislay.text()).toContain(counter - 1);
});

test('clicking button decrement when zero - display error', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  
  //find display and test value
  const counterDislay = findByTestAttr(wrapper, "counter-display");
  expect(counterDislay.text()).toContain(0);

  //find display and test value
  let errorDislay = findByTestAttr(wrapper, "error-display"); //console.log(errorDislay.debug());
  expect(errorDislay.text()).toContain("The counter can't go below zero");

  const buttonInc = findByTestAttr(wrapper, 'increment-button');
  buttonInc.simulate('click');
  errorDislay = findByTestAttr(wrapper, "error-display"); //console.log(errorDislay.debug());
  expect(errorDislay.length).toBe(0);
});