#added libs

#react-native navigation from site
>yarn add @react-navigation/native
>yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
>yarn add @react-navigation/stack

>yarn react-native run-android

>yarn cache clean

>yarn android

#firebase
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


#added redux
>yarn add redux react-redux redux-thunk 
>yarn add readux-devtools-extension react-native-debugger --dev
>yarn global add react-devtols

#error
 ERROR    Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/async-storage
 >yarn add @react-native-community/async-storage

#environment TODO add environment for:
-config/firebase.js

#added for work with form
>yarn add yup
>yarn add formik

#add toast https://www.npmjs.com/package/react-native-toast-message
>yarn add react-native-toast-message



#Flow ro TypeScript
#React natvie elements, material-ui
#Вход по почте в firebase есть примеры при выборе способа https://console.firebase.google.com/u/0/project/exchanger-v0/authentication/providers