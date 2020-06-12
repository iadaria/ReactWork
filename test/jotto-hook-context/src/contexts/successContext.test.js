import React from 'react';
import { shallow, mount } from 'enzyme';

import successContext from './successContext';

// a functional componentn that calls useSuccess
const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test('useSuccess throws error when not wrapper in SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
})

test('useSuccess does not throws error when not wrapper in SuccessProvider', () => {
  expect(() =>{
    mount(
    <successContext.SuccessProvider>
      <FunctionalComponent />
    </successContext.SuccessProvider>
    );
  }).not.toThrow();
});