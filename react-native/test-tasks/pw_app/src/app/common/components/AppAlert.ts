import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

interface IProps {
    title: string;
    text: string;
    func: () => void;
}

export default function AppAlert(title: string, text: string, func: () => void) {
    return (
        Alert.alert(
            `${title}`,
            `${text}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Done",
                    onPress: async () => {
                        //changeScreen(null);
                        func();
                        //dispatch({ type: REMOVE_TODO, id });
                    },
                },
            ],
            { cancelable: true }//false }
        )
    )
}

const styles = StyleSheet.create({})
