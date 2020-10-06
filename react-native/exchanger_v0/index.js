import React from 'react';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';
import { configureStore } from './src/app/store/configureStore';

const store = configureStore();

function Root() {
    return (
        <RootSiblingParent>
            <Provider store={store}>
                <App />
            </Provider>
        </RootSiblingParent>
    )
}
AppRegistry.registerComponent(appName, () => Root);//App);