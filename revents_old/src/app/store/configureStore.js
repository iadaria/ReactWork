import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

const rrfConfig = {
    userProfiles: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true
};