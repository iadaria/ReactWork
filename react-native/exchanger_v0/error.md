# error 1
Error: You attempted to use a firebase module that's not installed on your Android project by calling firebase.auth().

Ensure you have:

1) imported the 'io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage' module in your 'MainApplication.java' file.

2) Added the 'new ReactNativeFirebaseAuthPackage()' line inside of the RN 'getPackages()' method list.

See http://invertase.link/android for full setup instructions.

#solved 1 https://rnfirebase.io/enabling-multidex


# error 2 during login with Google
error [Error: DEVELOPER_ERROR]
#error 2 solve
>cd android/app
>keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
Get sh1 number of cert and enter it to firebase site


# errors
>react-native start --reset-cache || >yarn start --reset-cache
If you are sure the module exists, try these steps:
1.Clear watchman watches: watchman watch-del-all
2.Delete node_moduels: rm -rf node_modules and run yarn install
3.Reset Metro's cache: yarn start ---reset-cache
4.Remove the cache: rm -rf /tmp/metro-*] 

# useful links for problems
https://stackoverflow.com/questions/51341627/android-gives-error-cannot-fit-requested-classes-in-a-single-dex-file/62459483#62459483


# error
 ERROR    Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/async-storage
 >yarn add @react-native-community/async-storage
