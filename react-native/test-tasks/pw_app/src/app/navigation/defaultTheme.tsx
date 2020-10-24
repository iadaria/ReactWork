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
    headerTintColor: THEME.TITLE_COLOR,
    headerTitleAlign: "center"
};

export const defaultTabScreenOptions = {
    ...defaultScreenOptions,
}

const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        //background: THEME.BACKGROUND_SCREEN_COLOR
    }
};