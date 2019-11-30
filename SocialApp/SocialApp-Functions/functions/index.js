const functions = require("firebase-functions");
const app = require('express')();
const FBAuth = require('./utilities/fbAuth');
const { db } = require('./utilities/admin');

const { 
    getAllPosts, 
    postOnePost,
    getPost,
    commentOnPost,
    likePost,
    unLikePost,
    deletePost
     } = require('./routes/posts');
const { 
    signUp, 
    login, 
    uploadImage, 
    addUserDetails,
    getAuthenticatedUser,
         } = require('./routes/users');

// POSTS ROUTES:
// GET posts route 
app.get('/posts', getAllPosts );
// POST post route
app.post('/post', FBAuth, postOnePost);
// get post by ID
app.get('/post/:postId', getPost);


// Delete Post
app.delete('/post/:postId', FBAuth, deletePost)
// Like Post
app.post('/post/:postId/like', FBAuth, likePost);
// Unlike post 
app.post('/post/:postId/unlike', FBAuth, unLikePost);
// Add comment to a post
app.post('/post/:postId/comment', FBAuth, commentOnPost);

//USER ROUTES
// Signup (register) - User route
app.post('/signup', signUp);
// Login route - User Route
app.post('/login', login );
// upload image route
app.post('/user/image', FBAuth, uploadImage);
// Add user information
app.post('/user', FBAuth, addUserDetails);
// Get user data
app.get('/user', FBAuth, getAuthenticatedUser);

//https://baseurl.com/api/
exports.api = functions.https.onRequest(app);

// Notifications!!!!!!!
exports.deleteNotificationOnUnLike = functions
.region('us-central1')
.firestore.document(`likes/{id}`)
.onDelete((snapshot)=> {
    db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(()=>{
            return;
        })
        .catch(err =>{
            console.error(err);
            return;
        })
})

exports.createNotificationOnLike = functions
.region('us-central1')
.firestore.document(`likes/{id}`)
         .onCreate((snapshot) => {
            db.doc(`/posts/${snapshot.data().postId}`).get()
                .then((doc) => {
                    if(doc.exists) {
                        return db.doc(`/notifications/${snapshot.id}`).set({
                            createdAt: new Date().toISOString(),
                            recipient: doc.data().userHandle,
                            sender: snapshot.data().userHandle,
                            type: 'like',
                            read: false,
                            postId: doc.id
                        });
                    }
                })
                .then(() => {
                    return;
                })
                .catch(err => {
                    console.error({err})
                    return;
                });
         });
exports.createNotificationOnComment = functions
.region('us-central1')
.firestore.document(`comments/{id}`)
.onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`).get()
        .then((doc) => {
            if(doc.exists) {
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'comment',
                    read: false,
                    postId: doc.id
                });
            }
        })
        .then(() => {
            return;
        })
        .catch(err => {
            console.error({err})
            return;
        });
 });
