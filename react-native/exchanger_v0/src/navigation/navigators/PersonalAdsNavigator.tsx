import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalAdsScreen from '../../screens/PersonalAdsScreen';


export default function PersonalAdsNavigator(): JSX.Element {

    const PersonalAds = createStackNavigator();
    return (
        <PersonalAds.Navigator>
            <PersonalAds.Screen name="PersonalAds" component={PersonalAdsScreen} />
        </PersonalAds.Navigator>
    );
}

