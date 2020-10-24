import { IUserInfo } from "../../app/models/user";

/**************** Constants **************/
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

/**************** Actions **************/
export function signInUser(user: IUserInfo) {
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
/**************** Reducer **************/
interface IAuthInitialState {
    authenticated: boolean;
    currentUser: IUserInfo | null;
}

const initialState: IAuthInitialState = {
    authenticated: false,
    currentUser: null,
};

export default function authReducer(
    state: IAuthInitialState = initialState, 
    { type, payload } : any
): IAuthInitialState {
    switch(type) {
        case SIGN_IN_USER:
            return {
                ...state,
                authenticated: true,
                currentUser: payload
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