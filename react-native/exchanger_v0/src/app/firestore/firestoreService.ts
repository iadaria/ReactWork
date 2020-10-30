import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { tempID } from '../common/utils/utils';
import firebase from '../config/firebase'; 
import { Identifier } from '../models/common';
import { IUser } from '../models/IUser';

const db = firebase.firestore(); //It's for Web

/************************ Common ****************************/

export function dataFromSnapshot<T extends Identifier>(
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot
) : T {
    
    const data: FirebaseFirestoreTypes.DocumentData | undefined = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate();
            }
        }
    }

    return {
        ...data, //data hasn't id
        id: snapshot.id 
    } as T; 
}

/************************ Profile ***************************/
export function getUserProfile(userId: string): 
    FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData> 
{
    return db.collection('users').doc(userId);
}

export function setUserProfileData(user:  FirebaseAuthTypes.User): Promise<void> {
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


/************************** Setting (TOOD in server side) ****************************/


/*********************************** User ********************************************/
//https://cloud.google.com/firestore/docs/solutions/presence
/* export async function updateUserConnectedState(state: string) {
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
} */

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