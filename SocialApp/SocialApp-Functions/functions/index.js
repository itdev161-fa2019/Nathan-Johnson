const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./Account/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://social-media-app-f4e13.firebaseio.com"
});



const express = require('express');
const app = express();

app.get('/posts', (req, res) => {
  admin
    .firestore()
    .collection('posts')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
});

app.post('/post', (req, res) => {

  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin
    .firestore()
    .collection('posts')
    .add(newPost)
    .then((doc) => {
      res.json({ message: `document id: ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

//https://baseurl.com/api/
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
