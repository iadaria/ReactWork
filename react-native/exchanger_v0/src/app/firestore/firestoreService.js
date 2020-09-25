//import firestore from '@react-native-firebase/firestore';
import { getCircularReplacer } from '../common/utils/utils';
import firebase from '../config/firebase'; //It's for Web

//const db = firebase.firestore(); //It's for Web
//const db = firestore();

/************************ Common ****************************/
export function dataFromSnapshot(snapshot) {
    if (!snapshot || !snapshot.exists) {
        console.log('snapshot', snapshot);
        return null;//undefined;
    }
    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            //if (data[prop] instanceof firebase.firestore.Timestamp) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data,
        id: snapshot.id //data hasn't id
    };
}

/************************ Profile ***************************/
export function getUserProfile(userId) {
    return firebase.firestore().collection('users').doc(userId);
}

export function setUserProfileData(user) {
    console.log('Will be added user', user);
    return firebase.firestore().collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email || "",
        photoURL: user.photoURL || null,
        createAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

/************************** User ****************************/
