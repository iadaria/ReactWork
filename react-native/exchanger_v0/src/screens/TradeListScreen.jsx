import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NotifService from '../app/services/NotifService';
import { THEME } from '../theme';

export default function TradeListScreen() {
    const notifService = new NotifService();
    return (
        <View style={styles.root}>
            <Text>
                TradeListScreen
            </Text>
            <Button 
                onPress={() => notifService.testPush()}
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