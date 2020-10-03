import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Toast from 'react-native-root-toast';
import ErrorToast from '../app/common/components/AppToast';
import { signOutFirebase, signOutGoogle } from '../app/firestore/firebaseService';
import { THEME } from '../theme';

export default function PersonalCabinetScreen({ navigation }) {

    async function handleSignOut() {
        try {
            await signOutFirebase();
            navigation.navigate("MainLogin");
            await signOutGoogle();
        } catch (error) { 
            ErrorToast('test');
            console.log('test toast');
        }
    }

    return (
        <View style={styles.root}>
            {/* <Text>
                Personal Cabinet Screen
            </Text> */}
            <View style={styles.buttons}>
                <Button 
                    onPress={handleSignOut}
                    color={THEME.PINK_COLOR}
                    title="Выход"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20
        //justifyContent: "center",
    },
    buttons: {

    }
});