import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyB5ly-UL1WHGnsrbsiZBh6pTaTHkrBMTbA",
    authDomain: "think-piece-be86e.firebaseapp.com",
    databaseURL: "https://think-piece-be86e.firebaseio.com",
    projectId: "think-piece-be86e",
    storageBucket: "think-piece-be86e.appspot.com",
    messagingSenderId: "569798124721",
    appId: "1:569798124721:web:4ae024aae50669c6086e90",
    measurementId: "G-JP5G8QWR31"
  };
// Initialize Firebase
firebase.initializeApp(config);
//firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return;

    // Get a reference to the place in the databse where a user profile might be.
    const userRef = firestore.doc(`users/${user.uid}`);

    // Go and fetch the coument from that location.
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {displayName, email, photoURL } = user;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            });
        } catch (error) { console.error(`Error creating user`, error.message); }
    }

    return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
    if(!uid) return null;
    try {
        return firestore.collection('users').doc(uid);
        /* const userDocument = await firestore.collection('users').doc(uid).get();

        return { uid, ...userDocument.data() }; */
    } catch (error) { console.log('Error fetching user', error.message ); }
};

export default firebase;