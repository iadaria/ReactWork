//import { ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export default function RegisterScreen() {
    return (
        <View style={styles.root}>
            <Text>
                RegisterScreen 🎉
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.MAIN_COLOR
    }
});