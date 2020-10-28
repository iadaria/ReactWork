import { IUserForList } from "../../app/models/models";

/********************* Constants ***********************/
export const FETCH_USERS = 'FETCH_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const SET_FILTER = 'SET_FILTER';

/********************* Actions *************************/

export function fetchUsers(users: IUserForList[]) {
    return {
        type: FETCH_USERS,
        payload: users
    };
}

export function createTransaction() {
    return {
        type: CLEAR_USERS
    };
}
/********************* Reducer *************************/