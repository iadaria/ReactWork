import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HttpService from '../app/services/HttpService';
import { getColorText } from '../app/common/utils/utils';

export default function TradeListScreen() {
    const httpService = new HttpService();

    async function handleButtonPress() {
        let previousToken = await AsyncStorage.getItem('pushToken');
        console.log(getColorText("", previousToken, "BgYellow"));
        console.log('process.env', process.env);
        //if (previousToken) {
            const message = {
                token: previousToken,
                title: "first message",
                message: "Hellow",
            };
            try {
                const result = await httpService.sendPushMessage(message);
                console.log(getColorText("result", result, "blue"));

            } catch (err) { console.log(getColorText("[TradeListenScreen] error", err, "red")); }
       // }
    }

    return (
        <View style={styles.root}>
            <Text>
                TradeListScreen
            </Text>
            <Button 
                onPress={ async () => await handleButtonPress() }
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