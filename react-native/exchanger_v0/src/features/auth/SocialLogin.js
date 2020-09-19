import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
//import Separator from '../../app/common/components/Separator';

export default function SocialLogin() {
    return (
        
            
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
        
    );
}

const styles = StyleSheet.create({
    googleButtonView: {
        marginTop: '5%'
        //marginVertical: '5%'
    }
});