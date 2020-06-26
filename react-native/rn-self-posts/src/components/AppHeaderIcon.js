import React from 'react';
import { Platform} from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons/* , AntDesign */ } from '@expo/vector-icons';
import { THEME } from '../theme';
import { useLinkProps } from '@react-navigation/native';

export const AppHeaderIcon = props => 
    <HeaderButton
        {...props} 
        title={props.title}
        iconSize={24}
        //IconComponent={Platform.OS === 'android' ? AntDesign : Ionicons}
        IconComponent={Ionicons}
        //IconComponent={AntDesign}
        color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR }
    />;