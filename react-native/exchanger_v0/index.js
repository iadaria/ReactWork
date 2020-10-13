import React from 'react';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName} from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';
import { configureStore } from './src/app/store/configureStore';

const store = configureStore();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
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
  
AppRegistry.registerComponent(appName, () => HeadlessCheck);//Root //App);