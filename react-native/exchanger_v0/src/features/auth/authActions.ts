import { 
    SIGN_IN_USER, 
    SIGN_OUT_USER } from "./authConstants";
//import firebase from '../../app/config/firebase'; //It's for Web
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; // For RN
import { dataFromSnapshot, getUserProfile } from "../../app/firestore/firestoreService";
import { listenToCurrentUserProfile } from "../profiles/profileActions";
import { APP_LOADED } from "../../app/async/asyncReducer";
import { getColorText } from "../../app/common/utils/utils";
import { IUserByProvider } from "../../app/models/IUser";
import { IAction } from "../../app/models/common";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IProfile } from "../../app/models/IProfile";

export function verifyAuth() {

    return function (dispatch: any) {
        //Adds an observer for changes to the user's sign-in state.
        return auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null ) => {
            console.log(getColorText('event autherization was involved', "", "magenta"))
            //let unsubscribe = () => {};
            if (user) {
                const _user: IUserByProvider = user as IUserByProvider;
                console.log(getColorText('authAction =>user signed in successfully', "", "magenta"));
                dispatch(signInUser(_user));
                const profileRef = getUserProfile(user.uid);
                profileRef?.onSnapshot((snapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
                    snapshot && console.log('verifyAuth -> profileRef.onSnapshot event', snapshot.metadata);
                    
                    snapshot.exists && dispatch(
                        listenToCurrentUserProfile(dataFromSnapshot<IProfile>(snapshot))
                    );
                },
                error => console.log('error update Profile', error));
                dispatch( { type: APP_LOADED } );
            } else {
                console.log(getColorText('authAction -> sign out', "", "magenta"));
                dispatch(signOutUser());
                dispatch( { type: APP_LOADED } );
            }
        });
    };
}

export function signInUser(user: IUserByProvider): IAction  {
    return {
        type: SIGN_IN_USER,
        payload: user
    };
}

export function signOutUser(): IAction {
    return {
        type: SIGN_OUT_USER
    };
}