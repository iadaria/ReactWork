import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { socialLogin } from '../../app/firestore/firebaseService';
import { GoogleSigninButton } from '@react-native-community/google-signin';

export default function SocialLogin({ goToMainScreen }) {

    return (  
            <View
                style={styles.googleButtonView}
            >
                <Text style={{textAlign: 'center'}}>Авторизироваться с помощью Google</Text>
                <GoogleSigninButton
                    style={{ width: '100%', height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    //color={GoogleSigninButton.Color.Dark}
                    onPress={() => 
                        socialLogin('google')
                        .then(() => {
                            console.log('success entered by Google');
                            goToMainScreen();
                        }).catch(error => console.log('error', error))
                    }
                />
                {/* <Button
                    //color="transparent"
                    onPress={() => 
                        socialLogin('google')
                        .then(() => {
                            console.log('success entered by Google');
                            goToMainScreen();
                        }).catch(error => console.log('error', error))
                    }
                    accessibilityLabel="label"
                    title="Продолжить с Google"
                /> */}
            </View>
        
    );
}

const styles = StyleSheet.create({
    googleButtonView: {
        marginTop: '5%'
        //marginVertical: '5%'
    }
});