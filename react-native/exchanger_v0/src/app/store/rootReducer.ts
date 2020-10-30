import { combineReducers } from 'redux';
import authReducer, { IAuthState } from '../../features/auth/authReducer';
import profileReducer, { IProfileState } from '../../features/profiles/profileReducer';
import { IModalState } from '../common/modals/modalReducer';

export interface IRootState {
    auth: IAuthState;
    profile: IProfileState;
    modal: IModalState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

export default rootReducer;