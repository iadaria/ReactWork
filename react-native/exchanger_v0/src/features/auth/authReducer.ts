import { IAction } from "../../app/models/common";
import { DefaultUserValues, IUser } from "../../app/models/IUser";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export interface IAuthState {
    authenticated: boolean;
    currentUser: IUser | null;
}

const initialState: IAuthState = {
    authenticated: false,
    currentUser: null,

    //prevScreen: null,
    //currentScreen: null
};

export default function authReducer(
    state: IAuthState = initialState, 
    { type, payload } : IAction = { type: "", payload: undefined }
): IAuthState {

    switch(type) {

        case SIGN_IN_USER:
            return {
                ...state,
                authenticated: true,
                currentUser: {
                    ...DefaultUserValues,
                    uid: payload.uid,
                    displayName: payload.displayName,
                    email: payload.email,           
                    photoURL: payload.photoURL,
                    providerId: payload.providerData[0].providerId,
                }
            };

        case SIGN_OUT_USER:
            return {
                ...state,
                authenticated: false,
                currentUser: null
            };

        default: return state;
    }

}