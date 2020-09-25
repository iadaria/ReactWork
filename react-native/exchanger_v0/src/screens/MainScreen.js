import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { getColorText } from '../app/common/utils/utils';
import { THEME } from '../theme';

export default function MainScreen({ navigation }) {
    const { currentUserProfile } = useSelector((state) => state.profile);
    return (
        <View style={styles.root}>
            <Text style={styles.mainText}>
                Лучшее место для покупки и продажи {/* скинов */}, голды, аккаунтов 🎉
            </Text>
            <Text style={styles.discountText}>
                0% комиссия - успевай пока внедряю
            </Text>
            <Button
                color={THEME.SECOND_COLOR}
                onPress={() => navigation.navigate('Login')} 
                title="Войти"
            />
            <Button
                color={THEME.SECOND_COLOR}
                onPress={() => console.log(getColorText('currentProfileUser', currentUserProfile, 'yellow'))} 
                title="Profile"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.MAIN_COLOR
    },
    mainText: {
        //borderColor: 'yellow', borderWidth: 1, borderStyle: 'solid',
        marginTop: '20%',
        paddingHorizontal: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    },
    discountText: {
        marginVertical: '5%',
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    }
});