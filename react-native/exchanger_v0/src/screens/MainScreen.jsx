import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { THEME } from '../theme';

export default function MainScreen({ navigation }) {

    return (
        <View style={styles.root}>
            <Text style={styles.mainText}>
                Лучшее место для покупки и продажи {/* скинов */}, голды, аккаунтов 🎉
            </Text>
            <Text style={styles.discountText}>
                0% комиссия - успевай пока внедряю
            </Text>
            <Text style={styles.discountText}>
                Авторизируйтесь, чтобы использовать приложение на полную
            </Text>
            <View style={styles.authButtonView}>
                <Button
                    color={THEME.SECOND_COLOR}
                    onPress={() => navigation.navigate('Login')} 
                    title="Авторизируйтесь"
                />
            </View>
            <View style={styles.nextButtonView}>
                <Button
                    color={THEME.MAIN_COLOR}
                    onPress={() => navigation.navigate('Bottom')} 
                    title="Далее"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: THEME.MAIN_COLOR,
        padding: 5
    },
    mainText: {
        //borderColor: 'yellow', borderWidth: 1, borderStyle: 'solid',
        marginTop: '20%',
        //paddingHorizontal: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    },
    discountText: {
        marginVertical: '5%',
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    authButtonView: {
        marginHorizontal: 10,
    },
    nextButtonView: {
        marginTop: 10,
        marginHorizontal: 10
    }
});