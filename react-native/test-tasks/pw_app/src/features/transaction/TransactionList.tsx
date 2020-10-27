import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ITransaction } from '../../app/models/models';
import { IRootReducer } from '../../app/store/rootReducer';
import { ITransactionState } from './transactionReducer';

export default function TransactionList() {
    const { transactions } = useSelector((state: ITransactionState) => state.transaction);

    return (
        <FlatList
            data={transactions}
            keyExtractor={(transaction: ITransaction) => transaction.id}
            renderItem={( { item: transaction })  => (
                <List.Item
                    title={`to ${transaction.username}, amount: ${transaction.amount} PW`}
                    description={transaction.date}
                    left={props => <List.Icon {...props} icon="credit-card-check-outline" color="green"/>}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({

});
