import React from 'react';
import {  View, Text, StyleSheet } from "react-native";

export const FooedScreen = () => {
    const [data, setData] = React.useState("");
    return (
        <View>
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
