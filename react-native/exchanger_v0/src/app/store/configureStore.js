import { applyMiddleware, createStore } from "redux";
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { verifyAuth } from "../../features/auth/authActions";
import rootReducer from "./rootReducer";

export function configureStore() {

    let middlewaresToApply = [];
    if (__DEV__) {
        const createFlipperDebugger = require('redux-flipper').default;
        middlewaresToApply.push(createFlipperDebugger());
    }

    const middleware = applyMiddleware(...middlewaresToApply, ...[thunk]);
    const store = createStore(
        rootReducer,
        //applyMiddleware(thunk)
        middleware
    );

    /* const store = createStore(
        rootReducer, 
        composeWithDevTools(applyMiddleware(thunk))
    ); */

    store.dispatch(verifyAuth());

    return store;
}