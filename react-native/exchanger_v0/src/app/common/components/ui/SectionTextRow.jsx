import React from 'react'
import { StyleSheet, View } from 'react-native'
import { THEME } from '../../../../theme';

export default function SectionTextRow({label, value}) {
    return (
        <View style={styles.row}>
            <View style={styles.label}>{ label }</View>
            <View style={styles.value}>{ value }</View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
        padding: 20,
        backgroundColor: THEME.SECTION_COLOR,
        borderRadius: 8,
    },
    label: {

    },
    value: {
        flexDirection: 'row',
        alignItems: 'center'
    }
    
});
