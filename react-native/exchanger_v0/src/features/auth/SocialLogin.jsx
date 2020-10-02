import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { socialLogin } from '../../app/firestore/firebaseService';
//import { GoogleSignin } from '@react-native-community/google-signin';

export default function SocialLogin({ goToMainScreen }) {

    return (  
            <View
                style={styles.googleButtonView}
            >
                <Button
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
                />
            </View>
        
    );
}

const styles = StyleSheet.create({
    googleButtonView: {
        marginTop: '5%'
        //marginVertical: '5%'
    }
});