import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function TradeListScreen() {

    return (
        <View style={styles.root}>
            <Text>
                TradeListScreen
            </Text>
            <Button 
                onPress={async () => {
                }}
                title="Push local notification"
            />
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