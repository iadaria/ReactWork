import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const comonent = findByTestAttr(wrapper, 'component-language-picker');
  expect(comonent.exists()).toBe(true);
});

test('does not throw warning with expected props', () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() } );
});

test('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon"); //a few
  expect(languageIcons.length).toBeGreaterThan(0);
});

test('calls setLenguage prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon"); //a few

  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
