import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function AuthLoadingScreen(props) {
  useEffect(() => {
    _bootstrapAsync();
  });

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log("[AuthLoading] token", userToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.replace(userToken ? 'Profile' : 'Login');
  };

  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}