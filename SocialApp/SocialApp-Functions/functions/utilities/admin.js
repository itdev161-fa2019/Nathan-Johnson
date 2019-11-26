const admin = require("firebase-admin");
var serviceAccount = require("../Account/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://social-media-app-f4e13.firebaseio.com",
    storageBucket: "social-media-app-f4e13.appspot.com",
});

const db = admin.firestore();


module.exports = { admin, db }