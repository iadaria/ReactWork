var admin = require("firebase-admin");
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://exchanger-v0.firebaseio.com"
});

module.exports = admin;
/* const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://exchanger-v0.firebaseio.com"
});

module.exports = admin; */

// https://firebase.google.com/docs/admin/setup
// https://console.firebase.google.com/u/0/project/exchanger-v0/settings/serviceaccounts/adminsdk
// Сервисный аккаунт firebase-adminsdk-7k4pn@exchanger-v0.iam.gserviceaccount.com