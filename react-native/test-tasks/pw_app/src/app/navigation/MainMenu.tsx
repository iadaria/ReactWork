import { createStackNavigator } from '@react-navigation/stack';
import { min } from 'date-fns/esm';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from "react-redux";
import { IAsyncState } from '../../features/async/asyncReducer';
import { IAuthState } from '../../features/auth/authReducer';
import { IRootState } from '../store/rootReducer';
import AuthNavigator from './AuthNavigator';
import BottomNavigation from './BottomNavigation';
import { defaultScreenOptions, defaultTabScreenOptions } from './defaultTheme';

interface IProps {
    authenticated: boolean;
}

export default function MainMenu( { authenticated} : IProps) {

    const { loading } = useSelector<IRootState>(state => state.async) as IAsyncState;

    if (loading)  {
        return <ActivityIndicator style={{ flex: 1}} size="large" animating={true}/>;
    }

    const Main = createStackNavigator();
    
    return (
        <Main.Navigator
            screenOptions={{
                headerStatusBarHeight: 0,
                headerRight: (props) => null
                
            }}
            initialRouteName={
                authenticated ? "BottomTab" : "Authenticate"
            }
        >
            <Main.Screen
                name="Authenticate" component={AuthNavigator}
                options={defaultScreenOptions}
                
            />
            <Main.Screen
                options={defaultTabScreenOptions}
                name="BottomTab" component={BottomNavigation}
            />
        </Main.Navigator>
    );
}
