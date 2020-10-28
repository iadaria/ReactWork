import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ITransaction } from '../app/models/models';
import { IRootReducer } from '../app/store/rootReducer';
import { ITransactionState } from '../features/transaction/transactionReducer';
import TransactionSampleList from '../features/transaction/TransactionSampleList';
import { THEME } from '../theme';

export default function TransactionsScreen() {
    const { transactions }: ITransactionState = useSelector<IRootReducer>(state => state.transaction);
    const [searchUsername, setSearchUsername] = React.useState<string>('');

    const searchedTransactions: ITransaction[] = transactions.filter(transaction =>
        transaction.username.toLowerCase().includes(searchUsername.toLowerCase())
    );

    if (!searchedTransactions?.length) 
        return (
            <View style={styles.inline}>
                <Title>No transactions was found</Title>
            </View>
        );

    return (
        <View style={styles.viewRoot}>
            <View>
                <TextInput
                    style={styles.element}
                    mode="outlined"
                    label="User name"
                    placeholder="Enter the recipient"
                    left={<TextInput.Icon name="account" color="grey" />}
                    autoCorrect={false}
                    onChangeText={setSearchUsername}
                    value={searchUsername}
                />
            </View>

            <TransactionSampleList transactions={searchedTransactions} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        paddingHorizontal: THEME.PADDING_PAGE,
    },
    inline: {
        flexDirection: 'row'
    },
    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT,
    }
});