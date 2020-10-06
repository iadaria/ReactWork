import { tempID } from '../common/utils/utils';
//import firestore from '@react-native-firebase/firestore';
import firebase from '../config/firebase'; //It's for Web

const db = firebase.firestore(); //It's for Web

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
    return db.collection('users').doc(userId);
}

export function setUserProfileData(user) {
    console.log('Will be added user', user);
    return db.collection('users').doc(user.uid).set({
        displayName: tempID(),//generateUniqName()
        providerDisplayName: user.displayName,
        email: user.email || "",
        photoURL: user.photoURL || null,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        phoneNumber: null,
        //lastVisit: firebase.firestore.FieldValue.serverTimestamp(),
        rating: 0,
        like: 0,
        dislike: 0,
        online: true,
        //Standoff2
        standoff2Nick: "",
        standoff2ID: null,
        standoff2Avatar: null,
        standoff2Screen: null,
        standoff2DateScreen: null,
    });
}


/*********************************** User ********************************************/
//https://cloud.google.com/firestore/docs/solutions/presence
export async function updateUserConnectedState(state) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    try {
        return await db.collection('users').doc(user.uid).update({
            state: state,
            //last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        throw error;
    } 
}

/* export async function updateUserAppState(state) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    try {
        return await db.collection('users').doc(user.uid).update({
            appState: state,
            last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        throw error;
    } 
} */

/************************** Setting (TOOD in server side) ****************************/

