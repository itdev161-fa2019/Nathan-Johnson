const { admin, db } = require('../utilities/admin');
const config = require('../utilities/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../utilities/validators');


//signup
exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
       password: req.body.password,
       confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    const { valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);

    //default profile picture
    const noImg = 'defaultProfile.jpg'

    // VALIDATE DATA 
    let token, userId;
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                    config.storageBucket
                }/o/${noImg}?alt=media`,
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
}

//login
exports.login = (req, res) =>{
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if(!valid) return res.status(400).json(errors);


    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json ({token});
        })
        .catch((err) => {
            console.error(err);
            if(err.code === `auth/wrong-password`){
                return res.status(403).json({general: 'wrong credentials'})
            }else return res.status(500).json({error: err.code });
        });
}

// Upload profile picture 
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const busboy = new BusBoy({ headers: req.headers });
    let imageToBeUploaded = {};
    let imageFileName;
   

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname);
        console.log(filename);
        console.log(mimetype);
        console.log(encoding);
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({error: 'Wrong file type, please upload JPEG or PNG'})
        }
        const imageExtension = filename.split('.')[filename.split('.').length-1];
        // ex 452346543645674.jpg
        imageFileName = `${Math.round(Math.random()*10000000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
        console.log(imageToBeUploaded.filepath);
    });
    busboy.on('finish', () => {
        admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
            resumable: false, 
            matadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(()=> {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
        })
        .then(() => {
            return res.json ({ message: 'image uploaded'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code });
        });
    });
    busboy.end(req.rawBody);
};