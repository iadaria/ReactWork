import React from 'react'
import { StyleSheet, Text} from 'react-native'

export default function ProfileHeader({ text }) {
    return (
        <Text style={styles.header}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
    }
})
