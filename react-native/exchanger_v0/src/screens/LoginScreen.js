import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { THEME } from '../theme';

const Separator = () => (
    <View style={styles.separator} />
);

//TODO Error Sign in + after error add "Enter the code shown above" - capchar, forgot password and etc

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.root}>
            <Text style={styles.welcome}>
                Добро пажаловать 🎉
            </Text>
            <Text style={styles.enter}>
                Введите данные для продолжения работы в iad
            </Text>
            <TextInput
                style={styles.enterData}
                placeholder="Логин или почтовый адрес"
            />
            <TextInput
                style={styles.enterData}
                placeholder="Пароль"
            />
            <Text style={styles.forgotPassword}>
                Забыли пароль?
            </Text>

            <View style={styles.viewButtons} >
                <Button
                    color={THEME.MAIN_COLOR}
                    onPress={() => console.log('press')}
                    accessibilityLabel="label"
                    title="Продолжить"
                />  
            </View>

            <Separator />

            <Text style={{ textAlign: 'center'}}>ИЛИ</Text>

            <View
                style={styles.googleButtonView}
            >
                <Button
                    //color="transparent"
                    onPress={() => console.log('press google')}
                    accessibilityLabel="label"
                    title="Продолжить с Google"
                />
            </View>

            <Separator />

            <Text style={styles.signUp}>
                Don't have an account? Sign up
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
        color: '#eee',
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
    separator: {
        marginVertical: '5%',
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    googleButtonView: {
        marginVertical: '5%'
    },
    signUp: {
        fontSize: 18,
        textAlign: 'center'
    }
});
