import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Avatar, Button, Card, List, Searchbar, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { THEME } from '../../theme';
import { ITransaction, ITransactionFormValues, IUserInfo } from '../../app/models/models';
import TextInputMask from 'react-native-text-input-mask';
import { Transaction } from '../../app/services/agent';
import { ErrorToast, InfoToast } from '../../app/common/components/AppToast';

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
    currentUser: IUserInfo;
    initialTransaction: ITransactionFormValues & IError;
    newTransaction: (transaction: ITransaction) => void;
    updateCurrentUserInfo: (userInfo: IUserInfo) => void,
}

export default function AppCard({
    newTransaction, updateCurrentUserInfo, currentUser, initialTransaction
}: IProps) {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <Card>
            <Card.Title
                title="Create a transaction"
                subtitle="Mastercard/Tinkoff"
                left={() => <LeftContent size={40} />}
            />

            <Formik
                initialValues={initialTransaction}
                enableReinitialize={true}

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
                        console.info({ createdTransaction });
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
                    const DATA = [
                        { id: "1", username: "user 1" },
                        { id: "2", username: "user 2" },
                        { id: "3", username: "user 3" },
                        { id: "4", username: "user 4" },
                        { id: "5", username: "user 5" },
                        { id: "6", username: "user 6" },
                    ];
                    return (
                        <View>
                            <Card.Content>
                                {/* <Searchbar
                                    style={styles.searchUser}
                                    icon="account"
                                    placeholder="User"
                                    onChangeText={onChangeSearch}
                                    value={searchQuery}
                                /> */}
                                <TextInput
                                    style={styles.element}
                                    mode="outlined"
                                    label="User name"
                                    placeholder="Enter the recipient"
                                    autoCorrect={false}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                                <View style={styles.viewUsersList}>
                                    <FlatList
                                        scrollEnabled={true}
                                        style={styles.listUsers}
                                        data={DATA}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item, separators }) => (

                                            <TouchableHighlight
                                                key={item.id}
                                                onPress={() => console.info("was pressed", item)}
                                                underlayColor="#DDD"
                                            //onShowUnderlay={separators.highlight}
                                            //onHideUnderlay={separators.unhighlight}
                                            >
                                                <View style={{ backgroundColor: 'white' }}>
                                                    <Text style={styles.itemUser}>
                                                        {item.username}
                                                    </Text>
                                                </View>

                                            </TouchableHighlight>
                                        )}
                                    />
                                </View>

                                {/*  <TextInput
                                    style={styles.element}
                                    label="User name"
                                    placeholder="Enter the recipient"
                                    autoCorrect={false}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                /> */}
                                <TextInput
                                    mode="outlined"
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
                        </View>
                    );
                }}
            </Formik>
        </Card>
    )
}

const styles = StyleSheet.create({

    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT,
        zIndex: 0
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
    },
    viewUsersList: {
        height: 90,
        position: 'absolute',
        bottom: -20,
        width: '100%'
    },
    listUsers: {
        width: '101%',
        left: THEME.PADDING_PAGE - 10,
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    itemUser: {
        fontSize: 18,
        paddingLeft: 10,
        paddingVertical: 3
    },
});
