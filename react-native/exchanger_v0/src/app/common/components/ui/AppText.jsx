import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AppText({ ml = 0, mr = 0, children }) {
    return (
        <Text style={[styles.font, {marginLeft: ml, marginRight: mr}]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    }
});
