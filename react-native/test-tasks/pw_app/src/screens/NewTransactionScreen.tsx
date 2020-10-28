import React, { Dispatch, useState } from 'react';
import { connect } from 'react-redux';

import { ITransaction, ITransactionFormValues, IUserInfo } from '../app/models/models';
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
    currentUser, transactions, addTransaction, navigation, updateCurrentUserInfo }: IProps
) {
    const [initialTransaction, setInitialTransaction] = useState<ITransactionFormValues>({
        username: "", amount: NaN 
    });

    return (
        <>
            <AppCard 
                initialTransaction={initialTransaction}
                newTransaction={addTransaction}
                updateCurrentUserInfo={updateCurrentUserInfo} 
                currentUser={currentUser} 
            />

            <TransactionList 
                setInitialTransaction={setInitialTransaction}
                title="The recently transactions"
                transactions={transactions} 
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTransactionScreen);
