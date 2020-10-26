const functions = require('firebase-functions');
//const admin = require("../config/admin");
const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const db = admin.firestore();

exports.updateProfile = functions.firestore
    .document('users/{userId}')
    .onUpdate(async( snapshot, context) => {
        functions.logger.info("update profile");
    });

exports.helloWorld = functions.https.onRequest((request, response) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
