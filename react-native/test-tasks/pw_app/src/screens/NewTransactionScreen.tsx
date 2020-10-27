import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { ITransaction, IUserInfo } from '../app/models/models';
import { IRootReducer } from '../app/store/rootReducer';
import { updateCurrentUser } from '../features/auth/authReducer';
import { AppHeader } from '../features/header/AppHeader';
import AppCard from '../features/transaction/AppCard';
import TransactionList from '../features/transaction/TransactionList';
import { createTransaction } from '../features/transaction/transactionReducer';

interface IProps {
    currentUser: IUserInfo;
    transactions: ITransaction[];
    addTransaction: (transaction: ITransaction) => void;
    updateCurrentUserInfo: (userInfo: IUserInfo) => void,
    navigation: any;
}

function NewTransactionScreen({ 
    currentUser, transactions, addTransaction, navigation, updateCurrentUserInfo} : IProps
) {
    navigation.setOptions({
        headerTitle: () => <AppHeader currentUser={currentUser}/>
    });

    return (
        <>
            <AppCard newTransaction={addTransaction} updateCurrentUserInfo={updateCurrentUserInfo} currentUser={currentUser}/>
            <TransactionList title="The recently transactions" transactions={transactions}/>
        </>
    );
}

const mapStateToProps = (state: IRootReducer, ownProps: any) => ({
    transactions: state.transaction.transactions,
    currentUser: state.auth.currentUser!
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    addTransaction: (transaction: ITransaction) => dispatch(createTransaction(transaction)),
    updateCurrentUserInfo: (userInfo: IUserInfo) => dispatch(updateCurrentUser(userInfo)),
});

export default connect( mapStateToProps, mapDispatchToProps)(NewTransactionScreen);
