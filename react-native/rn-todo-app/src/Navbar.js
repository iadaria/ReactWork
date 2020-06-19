import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Navbar = ({ title }) => {
    return (
        <View style={styles.navbar} testID="navbar">
            <Text style={styles.text} testID="navbar-title">{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        /* borderColor: 'red',
        borderWidth: 1, */
        backgroundColor: '#3949ab',
        paddingBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});