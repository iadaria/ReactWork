import React from 'react';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';

function Root() {
    return (
        <RootSiblingParent>
            <App />
        </RootSiblingParent>
    )
}
AppRegistry.registerComponent(appName, () => Root);//App);
