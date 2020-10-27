import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { THEME } from '../../theme';
import TextInputMask from 'react-native-text-input-mask';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ITransactionFormValues } from '../../app/models/models';

const LeftContent = props =>
    <Avatar.Icon
        {...props}
        icon="credit-card"
        style={{ backgroundColor: THEME.ACCENT }}
    />;

export default function AppCard() {

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
                    amount: ""
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required(),
                    //amount: Yup.number().required()
                    amount: Yup.string().required()
                })}

                onSubmit={async (values: ITransactionFormValues, { setSubmitting, setErrors }) => {
                    console.log("[Formik Create a Transaction Submit] values", values);
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
                                    //onChangeText={handleChange('amount')}
                                    onChangeText={value => setFieldValue('amount', parseFloat(value))}
                                    onBlur={handleBlur('amount')}
                                    keyboardType="decimal-pad"
                                    value={values.amount}
                                />
                            </Card.Content>
                            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                            <Card.Actions>
                                <Button 
                                    onPress={resetForm}
                                    disabled={isDisabledSubmit}
                                    loading={isSubmitting}
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
});
