const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');


require('dotenv').config();

//port
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongoose

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true}
    );

const connnection = mongoose.connection;
connnection.once('open', () => {
    console.log('Connected To MongoDB');
})

const shipwrecksRouter = require('./routes/shipwrecks');
const usersRouter = require('./routes/users');

app.use('/shipwrecks', shipwrecksRouter);
app.use('/users', usersRouter);


//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
