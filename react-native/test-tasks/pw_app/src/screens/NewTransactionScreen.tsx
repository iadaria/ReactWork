import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppCard from '../features/transaction/AppCard';
import TransactionList from '../features/transaction/TransactionList';
import { THEME } from '../theme';

export default function NewTransactionScreen() {
    return (
        <View>
            {/* <Text style={styles.title}>Create a transaction</Text> */}
            <AppCard />
            <TransactionList title="The recently transactions"/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: THEME.TITLE_FONT_SIZE,
        textAlign: 'center',
        marginTop: 20
    }
})
