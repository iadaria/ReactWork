import firebase from 'firebase/app';
import 'firebse/firestore';
import 'firebse/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA66AmKLNQ-Xq3NpGJ9nRq2j_7qlJ9Efpo",
    authDomain: "revents-8e67a.firebaseapp.com",
    databaseURL: "https://revents-8e67a.firebaseio.com",
    projectId: "revents-8e67a",
    storageBucket: "revents-8e67a.appspot.com",
    messagingSenderId: "607666940901",
    appId: "1:607666940901:web:6ad970a22c14e9d96add0c"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
