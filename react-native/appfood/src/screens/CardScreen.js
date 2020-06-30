import React from 'react';
import {  View, Text, StyleSheet } from "react-native";

export const CardScreen = () => {
    const [data, setData] = React.useState("");
    return (
        <View>
            <Text>Cart food</Text>
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
