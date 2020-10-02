import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Padlock from '../../assets/images/padlock-svgrepo-com.svg';
import { THEME } from '../theme';

export default function UnauthScreen({ navigation }) {
    return (
        <View style={styles.root}>
            <View style={styles.body}>
                <Padlock height={130} width={130} />
                <Text style={styles.title}>
                    Доступ запрещён
                </Text>
                <Text style={styles.text}>
                    Войдите в свой акканут для просмотра этого раздела
            </Text>
            </View>
            <View style={styles.authButtonView}>
                <Button
                    color={THEME.SUBMAIN_COLOR}
                    onPress={() => navigation.navigate('Main')}
                    title="Авторизироваться"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        //borderWidth: 1, borderColor: 'red',
        flex: 1,
        marginTop: '30%',
    },
    body: {
        alignItems: 'center'
    },
    title: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        marginTop: 15,
        marginHorizontal: 15,
        fontSize: 17,
        textAlign: 'center',
    },
    authButtonView: {
        marginTop: 15,
        marginHorizontal: 15
    }
});