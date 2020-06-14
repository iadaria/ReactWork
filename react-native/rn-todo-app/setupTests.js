// setup-tests.js
import 'react-native';
import 'jest-enzyme';
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM();
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

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ 
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

/**
 * ++ disableLifecycleMethods ++
 * If set to true, componentDidMount is not called on the component, 
 * and componentDidUpdate is not called after setProps and setContext. 
 * Default to false.
 */

// Ignore React Web errors when using React Native
// allow other errors to propagate if they're relevant
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser)/
const realConsoleError = console.error
console.error = (message) => {
  if (message.match(suppressedErrors)) {
    return
  }
  //realConsoleError(message)
}