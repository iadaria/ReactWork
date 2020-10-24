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
    return {
        type: ASYNC_ACTION_ERROR,
        payload: error
    };
}

/***************** Async reducer **********************/
interface IAsyncInitialState {
    loading: boolean,
    error: string | null
}

const initialState: IAsyncInitialState = {
    loading: false,
    error: null
};

export default function asyncReducer( 
    state: IAsyncInitialState = initialState,
    { type, payload } : any 
): IAsyncInitialState {
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
        
        default: return state;
    }
}