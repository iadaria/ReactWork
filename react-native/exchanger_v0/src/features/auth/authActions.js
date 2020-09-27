import { 
    SIGN_IN_USER, 
    SIGN_OUT_USER } from "./authConstants";
//import firebase from '../../app/config/firebase'; //It's for Web
import auth from '@react-native-firebase/auth'; // For RN
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/profileActions";
import { APP_LOADED } from "../../app/async/asyncReducer";
import { getColorText } from "../../app/common/utils/utils";

export function verifyAuth() {
    return function (dispatch) {
        //Adds an observer for changes to the user's sign-in state.
        //return firebase.auth().onAuthStateChanged(user => { //It's for Web
        return auth().onAuthStateChanged(user => {
            console.log(getColorText('event autherization was involved', "", "magenta"))
            // If user sign in
            let un = () => {};
            if (user) {
                console.log(getColorText('authAction =>user signed in successfully', "", "magenta"));
                dispatch(signInUser(user));
                const profileRef = getUserProfile(user.uid);
                un = profileRef?.onSnapshot(snapshot => {
                    snapshot && console.log('verifyAuth -> profileRef.onSnapshot event', snapshot.metadata);
                    /* if (!snapshot) {
                        profileRef.get({ source: 'server'})
                        .then(_snapshot => snapshot = _snapshot )
                    } */
                    dispatch(
                        listenToCurrentUserProfile(dataFromSnapshot(snapshot))
                    );
                });
                dispatch( { type: APP_LOADED } );
            } else {
                console.log(getColorText('authAction -> sign out', "", "magenta"));
                dispatch(signOutUser());
                dispatch( { type: APP_LOADED } );
                un();
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