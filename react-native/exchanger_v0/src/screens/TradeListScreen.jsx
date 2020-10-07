import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import { LocalNotification } from '../app/services/LocalPushController';

export default function TradeListScreen() {

    function handleButtonPress() {
        //LocalNotification();
    }

    return (
        <View style={styles.root}>
            <Text>
                TradeListScreen
            </Text>
            <Button 
                onPress={async () => {}}
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