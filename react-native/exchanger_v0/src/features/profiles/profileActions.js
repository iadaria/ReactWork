import { getCircularReplacer, getColorText } from "../../app/common/utils/utils";
import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileConstants";

export function listenToCurrentUserProfile(profile) {
    console.log(
        getColorText("profileActions: change prifle to", profile, "green")
    );
    return {
        type: LISTEN_TO_CURRENT_USER_PROFILE,
        payload: profile
    };
}