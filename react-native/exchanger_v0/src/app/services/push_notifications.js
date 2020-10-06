import { AsyncStorage } from "react-native";

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async() => {
    let previousToken = await AsyncStorage.getItem('pushtoken');

    if (previousToken) {
        return;
    } else {
        //let { status } = await Permission.askAsync(Permissions.REMOTE_NOTIFICATIONS)
        if (status !== 'granted') {
            return;
        }
        //That identifies this particular user's device
        //let token = await Notifications.getExponentPushTokenAsync();
        //await axios.post(PUSH_ENDPOINT, { token: { token }});
        AsyncStorage.setItem('pushtoken', token);
    }
}