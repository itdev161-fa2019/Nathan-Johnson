import express from 'express';

// initialize express application
const app = express();

// API endpoints
app.get('/', (req,res) =>
    res.send('http get request rent to root api')
);

//Connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));