const functions = require("firebase-functions");
const app = require('express')();
const FBAuth = require('./utilities/fbAuth');


const { getAllPosts, postOnePost } = require('./routes/posts');
const { signUp, login, uploadImage } = require('./routes/users');

// GET posts route 
app.get('/posts', getAllPosts );
// POST post route
app.post('/post', FBAuth, postOnePost);
// Signup (register) - User route
app.post('/signup', signUp);
// Login route - User Route
app.post('/login', login );

// upload image route
app.post('/user/image', FBAuth, uploadImage)


//https://baseurl.com/api/
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
