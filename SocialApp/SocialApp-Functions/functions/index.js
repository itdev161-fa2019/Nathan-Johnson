const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./Account/serviceAccountKey.json");
const app = require('express')();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://social-media-app-f4e13.firebaseio.com"
});

const config = {
    apiKey: "AIzaSyAjigkQlxzzSkOPeuJm1wTYzJZCZ2vrkzA",
    authDomain: "social-media-app-f4e13.firebaseapp.com",
    databaseURL: "https://social-media-app-f4e13.firebaseio.com",
    projectId: "social-media-app-f4e13",
    storageBucket: "social-media-app-f4e13.appspot.com",
    messagingSenderId: "806120238288",
    appId: "1:806120238288:web:e7d81457d693fca16742d5",
    measurementId: "G-YLSCFMDKQ0"
  };
const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

// create post route
app.get('/posts', (req, res) => {
  db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
            postsId: doc.id,
            body: doc.data().body,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt
        });
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
});

// Get posts route
app.post('/post', (req, res) => {
  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };
  db
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

// Signup (register) newuser route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
       password: req.body.password,
       confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };
let token, userId;
    // VALIDATE DATA 
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(400).json({ handle: 'this handle is taken' });
            } else {
                return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idtoken =>{
            token = idtoken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId
            };
           return  db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.log(err);
            if(err.code == "auth/email-already-in-use"){
                return res.status(400).json({ email: `${newUser.email} already in use`})
            } else{
            return res.status(500).json({ error: err.code });
            }
        });
});



//https://baseurl.com/api/
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
