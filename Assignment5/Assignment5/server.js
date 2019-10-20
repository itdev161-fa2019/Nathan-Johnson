import express from 'express';
import connectDatabase from './config/db';
import {check, validationResult} from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/User';
import jwt from 'jsonwebtoken';
import config from 'config';


// initialize express application
const app = express();

//connectDatabase()
connectDatabase();

// configure Middleware
app.use(express.json({ extened: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

// API endpoints
/**
 * @route Get / 
 * @desc Test endpoint
 */
app.get('/', (req,res) =>
    res.send('http get request rent to root api endpoint')
);

/**
 * @route POST api/user
 * @desc Register user
 */


app.post(
    '/api/users', 
    [ 
        check('name', 'Please enter your name')
        .not()
        .isEmpty(),

        check('email', 'Please enter your email')
        .isEmail(),
        check(
            'password', 
            'Please enter a password with 6 or more characters'
            ).isLength({ min: 6 })
    ],
    
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } 
        
        else {
            const { name, email, password } = req.body;
            try {
                //see if user exists
                let user = await User.findOne ({email: email});
                if (user) {
                    return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
             
               }
                //create new user
                  user = new User({
                      name: name,
                      email: email,
                      password: password
                  });
                  
                  // Encrypt the password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                  // save the db and return
                await user.save();

                // Generate and return a JWT token
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                    jwt.sign(
                        payload,
                        config.get('jwtSecret'),
                        { expiresIn: '10hr'},
                        (err, token) => {
                            if (err) throw err;
                            res.json({token: token});
                        }
                    );

            } catch (error) {
                res.status(500).send('Server xxx error');
            }
            }
        }
 );


//Connection listener

const port = 5000;

app.listen(port, () => 
console.log('Express server is running on port ' + port))

