import React from 'react';
import {  View, Text, StyleSheet } from "react-native";

export const AddressScreen = () => {
    const [data, setData] = React.useState("");
    return (
        <View style={styles.root}>
            <Text>Address</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
