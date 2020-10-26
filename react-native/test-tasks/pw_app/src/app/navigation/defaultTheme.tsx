import React from 'react';
//import { Linking } from 'react-native';
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//import { AppHeaderIcon } from '../app/common/components/ui/AppHeaderIcon';
//import ErrorToast from '../app/common/components/AppToast';
import { DefaultTheme } from '@react-navigation/native';
import { THEME } from '../../theme';

export const defaultScreenOptions = {
    title: "Parrot Wings",
    headerStyle: {
        backgroundColor: THEME.BACKGROUND_TITLE
    },
    headerTitleAlign: "center"
};

export const defaultTabScreenOptions = {
    headerTitleAlign: "center",
    headerTintColor: "#FFF"
}

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#512da8',
        primary: '#eee'
    }
};