import { applyMiddleware, createStore, compose } from "redux";
//import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools } from 'remote-redux-devtools';
import devTools from 'remote-redux-devtools';

import thunk from "redux-thunk";
import { verifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";
import { Platform } from "react-native";

export function configureStore() {

    /* const store = createStore(
        rootReducer, 
        composeWithDevTools(applyMiddleware(thunk))
    ); */

    const enhancer = compose(
        applyMiddleware(thunk),
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 8000
        })
    );

    const store = createStore(
        rootReducer,
        enhancer
    );

    store.dispatch(verifyAuth());

    return store;
}