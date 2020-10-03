import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

const initialState = {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
    //profileEvents: [],
    //followers: [],
    //following: [],
    //followingUser: false,
    //feed: []
};

export default function profileReducer( state = initialState, { type, payload} ) {
    switch(type) {
        case LISTEN_TO_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: payload
            };
        

        default: return state;
    }
}