import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function AppText({ ml = 0, mr = 0, children, style = {} }) {
    return (
        <Text style={[styles.font, {marginLeft: ml, marginRight: mr}, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: 'black'
    }
});
