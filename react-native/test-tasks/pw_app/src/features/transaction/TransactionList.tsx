import React from 'react'
import { StyleSheet, SectionList, Text } from 'react-native'
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ITransaction } from '../../app/models/models';
import { ITransactionState } from './transactionReducer';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../theme';

interface IProps {
    title?: string;
}

export default function TransactionList<IProps>({ title }) {
    const { transactions } = useSelector((state: ITransactionState) => state.transaction);

    transactions.sort((a: ITransaction, b: ITransaction) => {
        if (a === b) {
            return 0;
        }
        return a.username < b.username ? -1 : 1;
    });

    const DATA = [
        {
            title,
            data: transactions
        }
    ];

    return (

        <SectionList
            sections={DATA}
            keyExtractor={(transaction: ITransaction, index: number) => transaction.id + index}
            renderItem={({ item: transaction }) => (
                <List.Item
                    title={`to ${transaction.username}, amount: ${transaction.amount}`}
                    description={format(new Date(transaction.date), 'MMMM d, yyyy h:mm:ss')}
                    left={props => <List.Icon {...props} icon="credit-card-check-outline" color="green" />}
                />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.title}>{title}</Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: THEME.TITLE_FONT_SIZE,
        textAlign: 'center',
        marginTop: 20
    }
});


/* <FlatList
    data={transactions}
    keyExtractor={(transaction: ITransaction) => transaction.id}
    renderItem={({ item: transaction }) => (
        <List.Item
            title={`to ${transaction.username}, amount: ${transaction.amount}`}
            description={format(new Date(transaction.date), 'MMMM d, yyyy h:mm:ss')}
            left={props => <List.Icon {...props} icon="credit-card-check-outline" color="green" />}
        />
    )}
/> */
