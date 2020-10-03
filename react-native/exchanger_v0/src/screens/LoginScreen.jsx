import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Separator from '../app/common/components/Separator';
import SocialLogin from '../features/auth/SocialLogin';
import { THEME } from '../theme';

import { signInWithEmail } from '../app/firestore/firebaseService';
import { getColorText } from '../app/common/utils/utils';
//TODO Error Sign in + after error add "Enter the code shown above" - capchar, forgot password and etc

export default function LoginScreen({ navigation }) {

    const goToMainScreen = () => navigation.navigate("MainBottom");

    return (
        <View style={styles.root}>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}

                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    console.log(getColorText("values", values, "green"));
                    try {
                       await signInWithEmail(values);
                       goToMainScreen();
                    } catch (error) {
                        setErrors({ auth: "Неверные логин и/или пароль" });
                        console.log(error);
                    } finally { setSubmitting(false); }
                }}
            >
                {({
                    handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, errors, values
                }) => {
                    const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                    return (
                        <View>
                            <Text style={styles.welcome}>
                                Добро пажаловать 🎉
                            </Text>
                            <Text style={styles.enter}>
                                Введите данные для продолжения работы в iad
                            </Text>

                            {errors.auth &&
                                <Text style={{ color: 'red', borderWidth: 1, borderColor: 'red', borderRadius: 5 }}>
                                    {errors.auth}
                                    {errors.email}
                                    {errors.password}
                                </Text>
                            }

                            <TextInput
                                style={styles.enterData}
                                placeholder="Логин или почтовый адрес"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('login')}
                                value={values.email}
                            />
                            <TextInput
                                style={styles.enterData}
                                placeholder="Пароль"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <Text style={styles.forgotPassword}>
                                Забыли пароль?
                            </Text>

                            <View style={styles.viewButtons} >
                                <Button
                                    disabled={isDisabledSubmit}
                                    color={THEME.MAIN_COLOR}
                                    onPress={handleSubmit}
                                    accessibilityLabel="label"
                                    title="Продолжить"
                                    //TODO ActivityIndicator with custom button
                                />
                            </View>

                            <Separator />

                            <Text style={{ textAlign: 'center' }}>ИЛИ</Text>

                            <SocialLogin goToMainScreen={goToMainScreen} />
                        </View>
                    );
                }}

            </Formik>

            <Separator />

            <Text style={styles.signUp}>
                Ещё нет аккаунта? Зарегистрироваться
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        //borderColor: 'red', borderWidth: 2, 
        flex: 1,
        //alignItems: "center",
        padding: '8%'
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center'
    },
    enter: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: '5%'
    },
    enterData: {
        width: '100%',
        marginTop: '5%',
        fontSize: 18,
        //borderColor: '#737373', borderWidth: StyleSheet.hairlineWidth, borderRadius: 5,
        borderColor: 'grey', borderWidth: 1, borderRadius: 5,
        color: 'grey',
        padding: 10
    },
    forgotPassword: {
        //borderColor: 'brown', borderWidth: 1,
        marginTop: '5%',
        color: THEME.MAIN_COLOR,
        alignSelf: 'flex-start',
        fontSize: 18
    },
    viewButtons: {
        //borderColor: 'grey', borderWidth: 1, 
        marginVertical: '5%'
    },
    signUp: {
        fontSize: 18,
        textAlign: 'center'
    }
});
