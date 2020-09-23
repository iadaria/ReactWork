import { Formik } from 'formik';
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Separator from '../app/common/components/Separator';
import SocialLogin from '../features/auth/SocialLogin';
import { THEME } from '../theme';

import { useDispatch } from 'react-redux';
import { signInWithEmail, socialLogin } from '../app/firestore/firebaseService';

//TODO Error Sign in + after error add "Enter the code shown above" - capchar, forgot password and etc

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();

    return (
        <View style={styles.root}>
            <Formik
                initialValues={{
                    login: "",
                    password: ""
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    console.log('submit enter with values', values);
                    try {
                        await signInWithEmail(values);
                    } catch(error) {
                        setErrors({ auth: "Неверные логин и/или пароль" });
                        console.log(error);
                    } finally { setSubmitting(false); }
                }}
            >
                {( { 
                    handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty, errors, values 
                } ) => {

                    return (
                        <View>
                            <Text style={styles.welcome}>
                                Добро пажаловать 🎉
                            </Text>
                            <Text style={styles.enter}>
                                Введите данные для продолжения работы в iad
                            </Text>

                            {errors.auth &&
                                <Text style={{color: 'red', borderWidth: 1, borderColor: 'red', borderRadius: 5}}>
                                    {errors.auth}
                                </Text>
                            }
                           
                            <TextInput
                                style={styles.enterData}
                                placeholder="Логин или почтовый адрес"
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                                value={values.login}
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
                                    color={THEME.MAIN_COLOR}
                                    onPress={handleSubmit}
                                    accessibilityLabel="label"
                                    title="Продолжить"
                                />
                            </View>

                            <Separator />

                            <Text style={{ textAlign: 'center' }}>ИЛИ</Text>

                            <SocialLogin />
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
        //flex: 1/6,
        //backgroundColor: THEME.MAIN_COLOR,
        //flexDirection: 'row',
        //justifyContent: 'center',
    },
    signUp: {
        fontSize: 18,
        textAlign: 'center'
    }
});
