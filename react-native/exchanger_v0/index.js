import React from 'react';
import { Provider } from 'react-redux';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';
import { configureStore } from './src/app/store/configureStore';
import messaging from '@react-native-firebase/messaging';

const store = configureStore();
//configurePushNotification();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    Alert.alert('Message handled in the background!', JSON.stringify(remoteMessage));
});

function Root() {
    return (
        <RootSiblingParent>
            <Provider store={store}>
                <App />
            </Provider>
        </RootSiblingParent>
    )
}

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return Root();
  }
  
//AppRegistry.registerComponent(appName, () => Root);//App);
AppRegistry.registerComponent(appName, () => HeadlessCheck);//App);