import { IAction } from "../../app/models/common";
import { IProfile } from "../../app/models/IProfile";
import { DefaultUserValues } from "../../app/models/IUser";
import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

export interface IProfileState {
    currentUserProfile: IProfile | null;
    selectedUserProfile: IProfile | null;
    photos: string[];
}

const initialState: IProfileState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
    //profileEvents: [],
    //followers: [],
    //following: [],
    //followingUser: false,
    //feed: []
};

export default function profileReducer( 
    state = initialState, { type, payload} : IAction = { type: "", payload: undefined}
): IProfileState {
    switch(type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: {...DefaultUserValues, ...payload}
            };
        

        default: return state;
    }
}