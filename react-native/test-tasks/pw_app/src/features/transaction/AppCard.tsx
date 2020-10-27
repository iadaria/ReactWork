import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { THEME } from '../../theme';
import { ITransaction, ITransactionFormValues, IUserInfo } from '../../app/models/models';
import TextInputMask from 'react-native-text-input-mask';
import { Transaction } from '../../app/services/agent';
import { ErrorToast, InfoToast } from '../../app/common/components/AppToast';
import { useDispatch } from 'react-redux';
import { createTransaction } from './transactionReducer';

interface IError {
    error?: string;
}

const LeftContent = (props: any) =>
    <Avatar.Icon
        {...props}
        icon="credit-card"
        style={{ backgroundColor: THEME.ACCENT }}
    />;

interface IProps {
    newTransaction: (transaction: ITransaction) => void;
    updateCurrentUserInfo: (userInfo: IUserInfo) => void,
    currentUser: IUserInfo;
}

export default function AppCard({ newTransaction, updateCurrentUserInfo, currentUser }: IProps) {
    //const dispatch = useDispatch();
    return (
        <Card>
            <Card.Title
                title="Create a transaction"
                subtitle="Mastercard/Tinkoff"
                left={() => <LeftContent size={40} />}
            />

            <Formik
                initialValues={{
                    username: "",
                    amount: NaN
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required(),
                    amount: Yup.number().min(1).required()
                })}

                onSubmit={async (values: ITransactionFormValues & IError, { setSubmitting, setErrors, resetForm }) => {
                    console.log("[Formik Create a Transaction Submit] values", values);
                    try {
                        const createdTransaction = await Transaction.create(values);
                        newTransaction(createdTransaction.trans_token);
                        InfoToast("Success the transaction");
                        resetForm();
                        updateCurrentUserInfo({
                            ...currentUser,
                            balance: currentUser.balance - values.amount
                        });
                        console.log('created transaction', { createdTransaction });
                    } catch (error) {
                        if (error.data && error.data.error) {
                            setErrors({ "error": error.data.error });
                            ErrorToast(error.data.error);
                        }
                        console.error('[Formik/submit/login/error]', JSON.stringify(error, null, 4));
                    } finally { setSubmitting(false); }
                }}
            >
                {({
                    handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue, resetForm,
                }) => {
                    const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                    return (
                        <>
                            <Card.Content>
                                <TextInput
                                    style={styles.element}
                                    label="User name"
                                    placeholder="Enter the recipient"
                                    autoCorrect={false}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                                <TextInput
                                    style={styles.element}
                                    type="number"
                                    label="Amount"
                                    placeholder="Enter the amount"
                                    render={(props) => <TextInputMask
                                        {...props}
                                        mask={"[0000000] PW"}
                                    />}
                                    onChangeText={handleChange('amount')}
                                    //onChangeText={value => setFieldValue('amount', parseFloat(value))}
                                    onBlur={handleBlur('amount')}
                                    keyboardType="decimal-pad"
                                    value={values.amount}
                                />
                                {(errors.error /* || errors.amount */) &&
                                    <Text style={styles.error}>
                                        {errors.error} {/* {errors.amount} */}
                                    </Text>
                                }
                            </Card.Content>
                            <Card.Actions>
                                <Button
                                    onPress={resetForm}
                                    disabled={isDisabledSubmit}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onPress={handleSubmit}
                                    disabled={isDisabledSubmit}
                                    loading={isSubmitting}
                                >
                                    Ok
                                </Button>
                            </Card.Actions>
                        </>
                    );
                }}
            </Formik>
        </Card>
    )
}

const styles = StyleSheet.create({
    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT,
    },
    error: {
        paddingHorizontal: 5,
        textAlign: 'center',
        marginTop: 10,
        alignSelf: 'center',
        minWidth: '50%',
        color: THEME.ERROR_TEXT,
        borderColor: THEME.ERROR_TEXT,
        borderWidth: 1,
        borderRadius: 5
    }
});
