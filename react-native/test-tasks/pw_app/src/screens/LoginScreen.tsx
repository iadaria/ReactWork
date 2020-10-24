import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { THEME } from '../theme';

export default function LoginScreen() {
    const [text, setText] = React.useState('');
    return (
        <View style={styles.viewRoot}>
            <Text style={styles.title}>Welcom</Text>
            <View>
                <TextInput
                    style={styles.element}
                    label="Email"
                    placeholder="Username or email address"
                    onChangeText={() => { }}
                />

                <TextInput
                    style={styles.element}
                    label="Password"
                    placeholder="Enter password"
                    onChangeText={() => { }}
                    secureTextEntry={true}
                />

                <Button 
                    style={[styles.element, styles.button]}
                    mode="contained" onPress={() => console.log('Pressed')}
                >
                    Continue
                </Button>

                <View style={[styles.element, styles.rowElements]}>
                    <Text style={styles.text}>Don't have an account?</Text>
                    <Button 
                        style={[styles.element, styles.button, styles.buttonText]}
                        mode="text"
                        onPress={() => console.log('Pressed')}
                    >
                        Sign up
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewRoot: {
        flex: 1,
        //alignItems: 'center'
        padding: THEME.PADDING_PAGE,
        justifyContent: 'center'
    },
    title: {
        fontSize: THEME.TITLE_BIG,
        textAlign: 'center',
        color: THEME.LIGHT_PRIMARY
    },
    button: {
        height: THEME.BUTTON_HEIGHT, 
        justifyContent: 'center'
    },
    element: {
        marginTop: THEME.MARGIN_TOP_ELEMENT
    },
    rowElements: {
        //borderWidth: 1, borderColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'     
    },
    buttonText: {
        //borderWidth: 1, borderColor: 'black',
        marginTop: 0
    },
    text: {
        fontSize: 18,
        color: THEME.GREY_TEXT_COLOR
    }
})
