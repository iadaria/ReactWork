/**
 * @format
 */

import 'react-native';
import React from 'react';
import { generateUniqName, ID } from '../src/app/common/utils/utils';
//import App from '../App';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

test('generate uniq id', () => {
    const usersNames = "jlkj;lkjlk;"
    let newId = generateUniqName(usersNames); 
    console.log('newId', newId);
    expect(usersNames.includes(newId)).toEqual(false);
});

/* it('renders correctly', () => {
  renderer.create(<App />);
}); */
