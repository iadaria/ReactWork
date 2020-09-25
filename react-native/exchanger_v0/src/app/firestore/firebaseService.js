import firebase from '../config/firebase'; // It's for Web
//import auth from '@react-native-firebase/auth';
import { setUserProfileData } from './firestoreService';
import { GoogleSignin } from '@react-native-community/google-signin';
import Toast from 'react-native-root-toast';

GoogleSignin.configure({
    webClientId: '1088744563414-4ga66dvdvts18ru1bogktieahaf0viiv.apps.googleusercontent.com',
});

/*************************** Sign ****************************/
export function signInWithEmail(creds) {
    //return firebase.auth().signInWithEmailAndPassword( //It's for Web
    return firebase.auth().signInWithEmailAndPassword(
        creds.email, creds.password
    );
}

export function signOutFirebase() {
    //return firebase.auth().signOut();
    return firebase.auth().signOut();
}

export async function socialLogin(selectedProvider) {
    
    let provider;
    if (selectedProvider === "google") {
        console.log("firebaseService => involved socialLogin with google");
        //provider = new firebase.auth().GoogleAuthProvider();
        
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        provider = firebase.auth.GoogleAuthProvider.credential(idToken);
    }

    try {
        //const result = await firebase.auth().signInWithPopup(provider);
        const result = await firebase.auth().signInWithCredential(provider);
        console.log("\nfirebaseServcie => sign in with Google - result: ", result);
        if (result.additionalUserInfo.isNewUser) {
            console.log('user is new, result user = ', result.user);
            await setUserProfileData(result.user);
        } else { console.log("not new ")}
    } catch (error) {
        console.log(error); //error.message for toast
        Toast.show(error.message, {
            visible: true,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            delay: 5000,
            animation: true,
            textColor: '#fff',
            backgroundColor: '#ba000d'
        });
    }
}