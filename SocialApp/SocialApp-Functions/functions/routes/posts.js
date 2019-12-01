const { db } = require('../utilities/admin');

exports.getAllPosts = (req, res) => {
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
              createdAt: doc.data().createdAt,
              commentCount: doc.data().commentCount,
              likeCount: doc.data().likeCount,
              userImage: doc.data().userImage
          });
        });
        return res.json(posts);
      })
      .catch((err) => {
          console.error(err);
      res.status(500).json({ error: er.code });
      });
  }

exports.postOnePost = (req, res) => {
    if(req.body.body.trim() === ''){
        return res.status(400).json({ body: 'Body must not be empty'})
    }
  const newPost = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };
  db
    .collection('posts')
    .add(newPost)
    .then((doc) => {
      const resPost = newPost;
      resPost.postId = doc.id;
      res.json({ resPost });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
}

// get one post by Id
exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/posts/${req.params.postId}`).get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: "post not found"})
      }
      postData = doc.data();
      postData.postId = doc.id;
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('postId', '==', req.params.postId)
        .get();
    })
    .then((data) => {
      postData.comments = [];
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return res.json(postData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
}

// Comment on a post
exports.commentOnPost = (req, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({error: 'No comment'});
  var ImageUrl = "https://firebasestorage.googleapis.com/v0/b/social-media-app-f4e13.appspot.com/o/defaultProfile.jpg?alt=media&token=095ea752-bfdd-4f20-a3b4-24921a42af57"
  if(req.user.imageURL){
    ImageUrl = req.user.imageURL
  }

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    userHandle: req.user.handle,
    userImage: ImageUrl,
  };

  db.doc(`/posts/${req.params.postId}`).get()
    .then(doc => {
        if(!doc.exists) {
          return res.status(404).json({error: 'Post not found'})
        }
        return doc.ref.update({commentCount: doc.data().commentCount + 1})
    })
    .then(() =>{
      return db.collection('comments').add(newComment);
    })
    .then(()=> {
    res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Danger to the manifold'});
    })
}

// Like a post
exports.likePost = (req, res) => {
  const likeDocument = 
  db
  .collection('likes')
  .where('userHandle', '==', req.user.handle)
  .where('postId', '==', req.params.postId)
  .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postId}`);

  let postData = {}

  postDocument.get()
    .then(doc => {
      if(doc.exists){
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Post not found'})
      }
    })
    .then(data => {
      if(data.empty) {
        return db.collection('likes').add({
          postId: req.params.postId,
          userHandle: req.user.handle
        })
        .then(()=> {
          postData.likeCount++
          return postDocument.update({ likeCount: postData.likeCount});
        })
        .then(() => {
          return res.json(postData);
        })
      } else {
        return res.status(400).json({ error: 'Already liked'});
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code });
    })
};

// Unlike Post
exports.unLikePost = (req, res) => {
  const likeDocument = 
  db
  .collection('likes')
  .where('userHandle', '==', req.user.handle)
  .where('postId', '==', req.params.postId)
  .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postId}`);

  let postData = {}

  postDocument
    .get()
    .then(doc => {
      if(doc.exists){
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Post not found'})
      }
    })
    .then((data) => {
      if(data.empty) {
        return res.status(400).json({ error: 'Not liked'});
      } else {
        return db.doc(`/likes/${data.docs[0].id}`).delete()
        .then(() => {
          postData.likeCount --;
          return postDocument.update({ likeCount: postData.likeCount });
        })
        .then(()=> {
          res.json(postData);
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code });
    });

}

// Delete Post
exports.deletePost = (req, res) => {
  const document = db.doc(`/posts/${req.params.postId}`);
  document.get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'Post not found'});
      }
      if(doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized'});      
      } else {
        return document.delete();
      }
    })
    .then(()=> {
      res.json({message: 'Your post is gone forever'});
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code })
    })
}