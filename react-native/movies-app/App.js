import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import MovieDetail from './screens/MovieDetail';
//import { SplashScreen } from 'expo';

const Stack = createStackNavigator();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState("Root");
    const containerRef = React.useRef();

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                //SplashScreen.preventAutoHide();

                //Load our initial navigation state
                //setInitialNavigationState(await getInitialState());

                //Load fonts
                /*await Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono: require('./assets/fonts/SpaceMono-Regular.ttf')
                
                })*/
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                //SplashScreen.hide();
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <NavigationContainer ref={containerRef}>
                    <Stack.Navigator>
                        <Stack.Screen name="Root" component={BottomTabNavigator} />
                        <Stack.Screen name="MovieDetail" component={MovieDetail} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
