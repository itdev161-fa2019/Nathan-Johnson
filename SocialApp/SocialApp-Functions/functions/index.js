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
    getUserDetails,
    markNotificationsRead
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
// Get any user's details (public route)
app.get('/user/:handle', getUserDetails);
// Mark notification as read
app.post('/notifications', FBAuth, markNotificationsRead);


//https://baseurl.com/api/
exports.api = functions.https.onRequest(app);

// Notifications!!!!!!!
exports.deleteNotificationOnUnLike = functions
.region('us-central1')
.firestore.document(`likes/{id}`)
.onDelete((snapshot)=> {
    return db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch(err =>{
            console.error(err);
            return;
        })
})

exports.createNotificationOnLike = functions
.region('us-central1')
.firestore.document(`likes/{id}`)
         .onCreate((snapshot) => {
           return db.doc(`/posts/${snapshot.data().postId}`).get()
                .then((doc) => {
                    if(doc.exists && doc.data().userhandle !== snapshot.data().userHandle) {
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
               .catch(err => 
                    console.error({err}));
         });


exports.createNotificationOnComment = functions
.region('us-central1')
.firestore.document('comments/{id}')
.onCreate((snapshot) => {
   return db.doc(`/posts/${snapshot.data().postId}`).get()
        .then((doc) => {
            if(doc.exists && doc.data().userhandle !== snapshot.data().userHandle) {
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
        .catch(err => {
            console.error({err})
            return;
        });
 });

 exports.onUserImageChange = functions
.region('us-central1')
.firestore.document('/users/{userId}')
.onUpdate((change)=> {
            console.log(change.before.data());
            console.log(change.after.data());
    if(change.before.data().imageUrl !== change.after.data().imageUrl) {
            console.log('image changed');
        const batch = db.batch();
        return db
            .collection('posts')
            .where('userHandle','==', change.before.data().handle)
            .get()
            .then((data)=> {
                data.forEach(doc => {
                    const post = db.doc(`/posts/${doc.id}`);
                    batch.update(post, {userImage: change.after.data().imageUrl});
                    });
                return batch.commit();
                });
        } else return true;
    });

    exports.onPostDeleted = functions
    .region('us-central1')
    .firestore.document(`/posts/{postId}`)
    .onDelete((snapshot, context) => {
        const postId = context.params.postId;
        const batch = db.batch();
        return db.collection('comments').where('postId', '==', postId).get()
            .then(data =>{
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection('likes').where('postId', '==', postId).get()
            })
            .then(data =>{
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                })
                return db.collection('notifications').where('postId', '==', postId).get()
            })
            .then(data =>{
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                })
                return batch.commit();
            })
            .catch((err) => console.error(err));
    })