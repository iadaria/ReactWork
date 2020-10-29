import React from 'react';
import { DefaultTheme, } from '@react-navigation/native';
import { THEME } from '../../theme';
import { AppHeader, AppHeaderRight } from '../../features/header/AppHeader';

import { Header, StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';
import { AppRegistry, Button, View } from 'react-native';

export const defaultScreenOptions = {
    title: "Parrot Wings",
    headerModee: 'none',
    headerStyle: {
        backgroundColor: THEME.BACKGROUND_TITLE
    },
    headerTitleAlign: "center"
};

export const defaultTabScreenOptions: StackNavigationOptions = {
    headerTitle: () => <AppHeader />,
    header: (props: StackHeaderProps): React.ReactNode => { // <Header {...props}/>{
        const { scene, navigation } = props;
        const { options: { headerRight } } = scene.descriptor;
       
        const newScene = {...scene};

        /* newScene.descriptor.options.headerTitle = 
            () => <AppHeader />; */
        newScene.descriptor.options.headerRight = 
            () => <AppHeaderRight navigation={navigation} />;

        return <Header {...props} scene={newScene} />;
    }
}

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: '#512da8',
        primary: '#eee'
    }
};