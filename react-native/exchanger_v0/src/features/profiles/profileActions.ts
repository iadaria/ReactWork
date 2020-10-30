import { getCircularReplacer, getColorText } from "../../app/common/utils/utils";
import { IProfile } from "../../app/models/IProfile";
import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

export function listenToCurrentUserProfile(profile: IProfile) {
    console.log(
        getColorText("profileActions: change prifle to", profile, "green")
    );
    return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    };
}