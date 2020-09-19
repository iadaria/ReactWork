import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';
import profileReducer from '../../features/profiles/profileReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

export default rootReducer;