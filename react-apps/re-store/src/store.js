import { createStore /*, compose */, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

const logMiddleware = ({getState, dispatch}) => (/* dispatch */next) => (action) => {
    console.log(action.type, getState());
    return next(action);
};

const stringMiddleware = (/* store */) => (/* dispatch */next) => (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        });
    }

    return next(action);
};

//const store = createStore(reducer, compose(stringEnhancer, logEnhancer));
//const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware));
const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, stringMiddleware, logMiddleware));

const myAction = (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), 2000);
};

store.dispatch('HELLOW_WORLD');
store.dispatch(myAction);

export default store;

/* const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            });
        }

        return originalDispatch(action);
    };

    return store;
};

const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);

        return originalDispatch(action);
    };

    return store;
}; */