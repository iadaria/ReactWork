import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { IRootState } from "../../app/store/rootReducer";
import { IAuthState } from "../../features/auth/authReducer";
import BottomNavigator from './BottomNavigator';
import { defaultScreenOptions } from '../defaultThemes';
import LoginNavigator from './LoginNavigator';

export default function MainMenu(): JSX.Element {
    const { authenticated } = useSelector<IRootState>(state => state.auth) as IAuthState;

    const Main = createStackNavigator();
    return (
        <Main.Navigator>
            {!authenticated &&
                <Main.Screen
                    options={defaultScreenOptions}
                    name="MainLogin" component={LoginNavigator}
                />
            }
            {authenticated &&
                <Main.Screen
                    options={defaultScreenOptions}
                    name="MainBottom" component={BottomNavigator}
                />
            }
        </Main.Navigator>
    );
}