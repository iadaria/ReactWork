import React from 'react';
//import { Linking } from 'react-native';
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//import { AppHeaderIcon } from '../app/common/components/ui/AppHeaderIcon';
//import ErrorToast from '../app/common/components/AppToast';
import { DefaultTheme, NavigationHelpersContext } from '@react-navigation/native';
import { THEME } from '../../theme';
import { AppHeader, AppHeaderLeft, AppHeaderRight } from '../../features/header/AppHeader';
import { Text } from 'react-native';

export const defaultScreenOptions = {
    title: "Parrot Wings",
    headerModee: 'none',
    headerStyle: {
        backgroundColor: THEME.BACKGROUND_TITLE
    },
    headerTitleAlign: "center"
};

export const defaultTabScreenOptions = {
    /* headerTitleAlign: "center",
    headerTitleStyle: {
        color: THEME.LIGHT_PRIMARY,
        fontSize: THEME.DEFAULT_FONT_SIZE
    },
    title: "PW",
    headerTintColor: "#FFF", */
    headerRight: () => <AppHeaderRight />,
    //headerLeft: () => <AppHeaderLeft />,
    headerTitle: () => <AppHeader />
}

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#512da8',
        primary: '#eee'
    }
};