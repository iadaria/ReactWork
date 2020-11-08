import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  StatusBar } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { THEME } from '../theme';
import MainMenu from './navigators/MainMenu';
import { defaultTheme } from './defaultThemes';

//LogBox.ignoreLogs(['Require cycle:']);

export default function AppNavigation() {

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor={THEME.MAIN_COLOR} />
            <NavigationContainer theme={defaultTheme}>
                <MainMenu />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}