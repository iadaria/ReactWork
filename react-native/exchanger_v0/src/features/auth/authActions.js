import { 
    SIGN_IN_USER, 
    SIGN_OUT_USER } from "./authConstants";
//import firebase from '../../app/config/firebase'; It's for Web
import auth from '@react-native-firebase/auth';
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/profileActions";
import { APP_LOADED } from "../../app/async/asyncReducer";

export function verifyAuth() {
    return function (dispatch) {
        //Adds an observer for changes to the user's sign-in state.
        //return firebase.auth().onAuthStateChanged(user => { //It's for Web
        return auth().onAuthStateChanged(user => {
            // If user sign in
            if (user) {
                console.log('authAction =>user signed in successfuly', user);
                dispatch(signInUser(user));
                const profileRef = getUserProfile(user.uid);
                
                profileRef.onSnapshot(snapshot => {
                    console.log('verifyAuth -> profileRef.onSnapshot event');
                    dispatch(
                        listenToCurrentUserProfile(dataFromSnapshot(snapshot))
                    );
                });
                dispatch( { type: APP_LOADED } );
            } else {
                console.log('authAction -> sign out');
                dispatch(signOutUser());
                dispatch( { type: APP_LOADED } );
            }
        });
    };
}

export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user
    };
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    };
}