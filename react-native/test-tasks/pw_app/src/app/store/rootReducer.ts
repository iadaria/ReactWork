import { combineReducers } from "redux";
import asyncReducer from "../../features/async/asyncReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    async: asyncReducer
});

export default rootReducer;