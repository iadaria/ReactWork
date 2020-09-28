import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export default function PersonalAdsScreen() {
    return (
        <View style={styles.root}>
            <Text>
                Personal Ads Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});