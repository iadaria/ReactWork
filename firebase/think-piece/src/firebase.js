import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase;

export default firebase;