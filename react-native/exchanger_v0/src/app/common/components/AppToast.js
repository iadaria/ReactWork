import Toast from "react-native-root-toast";

export default function ErrorToast(message) {
    return Toast.show(message, {
        visible: true,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        delay: 0,
        animation: true,
        textColor: '#fff',
        backgroundColor: '#ba000d'
    });
    //return errorToast;
}
