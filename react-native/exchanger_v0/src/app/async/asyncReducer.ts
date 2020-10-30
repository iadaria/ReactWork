import { IAction } from "../models/common";

/***************** Async constants ********************/
const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';
export const APP_LOADED = 'APP_LOADED';

/***************** Async actions **********************/
export function asyncActionStart() {
    return {
        type: ASYNC_ACTION_START
    };
}

export function asyncActionFinish() {
    return {
        type: ASYNC_ACTION_FINISH
    };
}

export function asyncActionError(error: string) {
    console.log('error from asyncReducer', error);
    return {
        type: ASYNC_ACTION_ERROR,
        payload: error
    };
}

/***************** Async reducer **********************/
export interface IAsyncState {
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

const initialState: IAsyncState = {
    loading: false,
    error: null,
    initialized: false
};

export default function asyncReducer( 
    state: IAsyncState = initialState, 
    { type, payload }: IAction = { type: "", payload: undefined }
) : IAsyncState {
    switch(type) {

        case ASYNC_ACTION_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case ASYNC_ACTION_FINISH:
            return {
                ...state,
                loading: false
            };
        
        case ASYNC_ACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        
        case APP_LOADED:
            return {
                ...state,
                initialized: true
            };

        default: return state;
    }
}