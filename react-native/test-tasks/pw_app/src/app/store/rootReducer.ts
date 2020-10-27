import { combineReducers } from "redux";
import asyncReducer, { IAsyncState } from "../../features/async/asyncReducer";
import authReducer, { IAuthState } from "../../features/auth/authReducer";
import transactionReducer, { ITransactionState } from "../../features/transaction/transactionReducer";

export interface IRootReducer {
    auth: IAuthState;
    async: IAsyncState;
    transaction: ITransactionState;
}

const rootReducer = combineReducers<IRootReducer>({
    auth: authReducer,
    async: asyncReducer,
    transaction: transactionReducer
});

export default rootReducer;