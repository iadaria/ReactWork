# TODO
1. Разграничение прав
2. Can change font of icons https://github.com/oblador/react-native-vector-icons as adding:
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]
3. Doing design for botton navigation button 

#base commands
>yarn start --reset-cache
>yarn cache clean --force
>yarn remotedev


# added libs

# react-native navigation from site
>yarn add @react-navigation/native
>yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
>yarn add @react-navigation/stack

>yarn react-native run-android

>yarn cache clean

>yarn android

# firebase
>yarn add firebase
>yarn add firebase-tools

#not need
>yarn add @react-native-firebase/app
/*Install the authentication moduel that in web belongs to firebase package*/
>yarn add @react-native-firebase/auth
>yarn add @react-native-community/google-signin
/*Install the cloud firestore*/
>yarn add @react-native-firebase/firestore

>yarn remove firebase firebase-tools


# added redux
>yarn add redux react-redux redux-thunk 
>yarn add readux-devtools-extension react-native-debugger --dev
>yarn global add react-devtols


# environment TODO add environment for:
-config/firebase.js

# added for work with form
>yarn add yup
>yarn add formik

# add toast https://github.com/magicismight/react-native-root-toast
>yarn add react-native-root-toast

# Flow ro TypeScript
#React natvie elements, material-ui
#Вход по почте в firebase есть примеры при выборе способа https://console.firebase.google.com/u/0/project/exchanger-v0/authentication/providers

# help
>"Top 10 React Native Toast Libraries in 2020" openbase

# colors
console.log(`\n\x1b[36m${JSON.stringify(values, null, 2)}\x1b[0m`);
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

# remote redux
>add remote-redux-devtools --dev
>yarn add remotedev-rn-debugger --dev

# remove: redux-devtools-extension, react-native-flipper, redux-flipper removedev-server