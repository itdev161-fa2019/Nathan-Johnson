import express from "express";

// initialize express aplication
const app = express();

// api endpoints
app.get('/'), (req,res) =>
    res.send('http get request sent to root api endpoint')
);

// Connection listener
app.listen(300, ()==> console.log('Express Server Running On Port 3000'));


