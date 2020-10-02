import firebase from '../config/firebase'; // It's for Web
//import auth from '@react-native-firebase/auth'; // For RN
import { setUserProfileData } from './firestoreService';
import { GoogleSignin } from '@react-native-community/google-signin';
import Toast from 'react-native-root-toast';
import ErrorToast from '../common/components/AppToast';

GoogleSignin.configure({ //For React Native
    webClientId: '1088744563414-4ga66dvdvts18ru1bogktieahaf0viiv.apps.googleusercontent.com',
});
/*************************** Sign ****************************/

export function signInWithEmail(creds) {
    return firebase.auth().signInWithEmailAndPassword(
    //return auth().signInWithEmailAndPassword(
        creds.email, 
        creds.password
    );
}

export function signOutFirebase() {
    return firebase.auth().signOut();
    //return auth().signOut();
}

export async function socialLogin(selectedProvider) {
    
    let provider;
    if (selectedProvider === "google") {
        console.log("firebaseService => involved socialLogin with google");
        //provider = new firebase.auth.GoogleAuthProvider();
        
        // For Firebase React Native
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        provider = firebase.auth.GoogleAuthProvider.credential(idToken);
    }

    try {
        //const result = await firebase.auth().signInWithPopup(provider); //For Web
        const result = await firebase.auth().signInWithCredential(provider); //for RN
        console.log("\nfirebaseServcie => sign in with Google - result: ", result);
        if (result.additionalUserInfo.isNewUser) {
            console.log('user is new, result user = ', result.user);
            await setUserProfileData(result.user);
        } else { console.log("not new user")}
    } catch (error) {
        console.log(error); //error.message for toast
        ErrorToast(error.message);
    }
}