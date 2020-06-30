import React from 'react';
import {  View, Text, StyleSheet } from "react-native";

export const ProfileScreen = () => {
    const [data, setData] = React.useContext("");
    return (
        <View>
            <Text>Profile</Text>
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
