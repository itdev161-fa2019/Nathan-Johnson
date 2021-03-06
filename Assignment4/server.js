import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import cors from 'cors';

// initialize express application
const app = express();

//connectDatabase()
connectDatabase();

//configure middleware
app.use(express.json({extended: false}))
app.use(
    cors({
        origin:'http://localhost:3000'
    })
);

// API endpoints
/**
 * @route GET /
 * @desc test endpoint
 */
app.get('/', (req,res) =>
    res.send('http get request rent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc register user
 */

app.post(
    '/api/users',
    [
    check('name', 'Enter your name')
    .not()
    .isEmpty(),
    check('email', 'Please enter an email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characeters'
    ).isLength({min: 6 })
],
(req,res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty())  {
       return res.status(422).json({errors: errors.array});
   } else {
        return res.send(req.body);
   }
  }
);

//Connection listener
const port = 5000;
app.listen(5000, () => console.log('Express server running on port 5000'));

