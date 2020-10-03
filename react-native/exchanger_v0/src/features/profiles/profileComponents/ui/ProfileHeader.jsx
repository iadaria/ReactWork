import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { THEME } from '../../../../theme';

export default function ProfileHeader({ text }) {
    return (
        <>
            <Text style={styles.header}>{text}</Text>
            {/* <Text style={styles.header2}>{text}</Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        marginBottom: THEME.MARGIN_AFTER_HEADER_SECTION,
    },
    header2: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
