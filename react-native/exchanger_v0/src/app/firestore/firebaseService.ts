import firebase from '../config/firebase'; // It's for Web
//import auth from '@react-native-firebase/auth'; // For RN
import { setUserProfileData } from './firestoreService';
import { GoogleSignin } from '@react-native-community/google-signin';
import ErrorToast from '../common/components/AppToast';
import { getColorText } from '../common/utils/utils';
import AsyncStorage from '@react-native-community/async-storage';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

GoogleSignin.configure({ //For React Native
    webClientId: '1088744563414-4ga66dvdvts18ru1bogktieahaf0viiv.apps.googleusercontent.com',
});
/*************************** Sign ****************************/
interface ICredential {
    email: string,
    password: string
}
export function signInWithEmail(creds: ICredential) {
    //If user new!!!!!! TODO
    return firebase.auth().signInWithEmailAndPassword(
    //return auth().signInWithEmailAndPassword(
        creds.email, 
        creds.password
    );
}

export const signOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export function signOutFirebase() {
    return firebase.auth().signOut();
}

export async function socialLogin(selectedProvider: string) {
    
    let provider: FirebaseAuthTypes.AuthCredential | undefined = undefined;
    if (selectedProvider === "google") {
        console.log("firebaseService => involved socialLogin with google");
        //provider = new firebase.auth.GoogleAuthProvider();
        
        // For Firebase React Native
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        provider = firebase.auth.GoogleAuthProvider.credential(idToken);
    }

    if (!provider) return;

    try {
        //const result = await firebase.auth().signInWithPopup(provider); //For Web
        const result: FirebaseAuthTypes.UserCredential 
            = await firebase.auth().signInWithCredential(provider); //for RN
        console.log("\nfirebaseServcie => sign in with Google - result: ", result);
        if (result.additionalUserInfo?.isNewUser) {
            console.log('user is new, result user = ', result.user);
            await setUserProfileData(result.user);
        } else { console.log("not new user")}
    } catch (error) {
        console.log(error); //error.message for toast
        ErrorToast(error.message);
    }
}


/************************ User ***************************/
//https://cloud.google.com/firestore/docs/solutions/presence
export function setOnlineStatusToFirebase() {
    if(!firebase.auth().currentUser) return;

    const uid: string = firebase.auth().currentUser!.uid;
    
    const userStatusDatabaseRef = firebase.database().ref(`users/${uid}`);
    const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP
    };
    const isOnlineForDatabase = {
        state: "online",
        last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    /*  Create a reference to the special '.info/connected' path in Realtime Database. This path returns `true` when connected
    and `false` when disconnected. */
    return firebase.database().ref('.info/connected').on('value', function(snapshot: FirebaseDatabaseTypes.DataSnapshot) {
        //If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
            return;
        }
        /* If we are currently connected, then use the 'onDisconnect()' method to add a set which will only trigger once this 
        client has disconnected by closing the app, losing internet, or any other means. */
        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect() 
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            userStatusDatabaseRef.set(isOnlineForDatabase);
        })
    });
}

export function getInfoConnectedRef(): FirebaseDatabaseTypes.Reference { return firebase.database().ref('.info/connected'); }

export function getUserUidRef() { 
    const user = firebase.auth().currentUser;
    if (!user) return;
    return firebase.database().ref(`users/${user.uid}`);
}

export function updateUserAppState(appState: string) {
    return getUserUidRef()?.update({
        appState,
        lastChangedAppState: firebase.database.ServerValue.TIMESTAMP
    });
}

export function testUpdateUserInOutUseEffect(inOutState: string) {
    return getUserUidRef()?.update({
        useEffect: inOutState,
        lastChangedAppState: firebase.database.ServerValue.TIMESTAMP
    });
}

export function updateUserToken(token: string) {
    console.log(getColorText("will update token to ", token, "green"));

    AsyncStorage.setItem('pushToken', token);

    return getUserUidRef()?.update({
        tokens: firebase.firestore.FieldValue.arrayUnion(token)
    });
}

