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
              createdAt: doc.data().createdAt
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
}