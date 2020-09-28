import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export default function TradeListScreen() {
    return (
        <View style={styles.root}>
            <Text>
                TradeListScreen
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