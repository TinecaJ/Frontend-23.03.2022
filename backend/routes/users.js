var express = require('express'); // calling the express library (confirm this)
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const User = require('../models/users.model'); //calling the users schema created 


const usersController = require( '../controller/users');
const { Router } = require('express');
const { expressValidator } = require('express-validator');
const { session } = require('express-session');
const emailvalidator = require("email-validator");


/* GET users listing. */
router.get('/', usersController.get_confirmation);
router.get('/list', usersController.get_users);

//HOW TO ADD DATA TO THE COLLECTION
router.post('/add', usersController.get_add );
//HOW TO GET DATA /SPECIFIC DATA FROM A COLLECTION
router.get('/searchbyname', usersController.get_username);

router.get('/searchbyId', usersController.get_userbyID );

 // "Express JS Tutorial #23 MongoDB CRUD - Update/PUT | Expressjs Tutorial For Beginners." YouTube. December 21, 2020. Accessed December 20, 2021. https://youtu.be/H-hVPwMDP2o.

        //UPDATING COLLECTIONS
 router.put('/updatepasswordbyname',  usersController.get_newpassword )

 router.put('/updatepasswordbyID',usersController.get_newpasswordbyID  );

   // "Express JS Tutorial #23 MongoDB CRUD - Delete | Expressjs Tutorial For Beginners." YouTube. December 21, 2020. Accessed December 20, 2021. https://youtu.be/H-hVPwMDP2o.

        //Delete COLLECTIONS 
    
router.delete('/delete', usersController.get_delete );
//MIDDLE WARE FOR THE FUNCTIONS


// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
       // grab the refresh token from the request header
       let refreshToken = req.header('x-refresh-token');
   
       // grab the _id from the request header
       let _id = req.header('_id');
   
       User.findByIdAndToken(_id, refreshToken).then((user) => {
           if (!user) {
               // user couldn't be found
               return Promise.reject({
                   'error': 'User not found. Make sure that the refresh token and user id are correct'
               });
           }
           // if the code reaches here - the user was found
           // therefore the refresh token exists in the database - but we still have to check if it has expired or not
   
           req.user_id = user._id;
           req.userObject = user;
           req.refreshToken = refreshToken;
   
           let isSessionValid = false;
   
           user.sessions.forEach((session) => {
               if (session.token === refreshToken) {
                   // check if the session has expired
                   if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                       // refresh token has not expired
                       isSessionValid = true;
                   }
               }
           });
   
           if (isSessionValid) {
               // the session is VALID - call next() to continue with processing this web request
               next();
           } else {
               // the session is not valid
               return Promise.reject({
                   'error': 'Refresh token has expired or the session is invalid'
               })
           }
   
       }).catch((err) => {
           res.status(401).send(err);
       })
   }
   

   /*https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js
        -To download the email validator library( required the upgraded version)
   */

   /*https://stackoverflow.com/questions/66357367/how-to-validate-uniqueness-of-email-id-in-node-js
        -Check to see if email is present in database
   */

// https://www.youtube.com/watch?v=NPyFYsZb2gE&list=PLIjdNHWULhPSZFDzQU6AnbVQNNo1NTRpd&index=11
//USERS ROUTES

 router.post('/users',
   
 (req, res,next) => {

   if(emailvalidator.validate(req.body.email)){
     
}else{
   res.status(400).send('Invalid Email');

}

User.findOne({ email: req.body.email }, (err, userWithSameEmail) => {
    if (err) {
      res.status(400).json({
        message: 'Error getting email try gain',
      });
    } else if (userWithSameEmail) {
      res.status(400).json({ message: 'This email is taken' });
    } else {
      
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    })
}
})
})

/*
 * POST /users/login
 * Purpose: Login
 */
router.post('/users/login', (req, res) => {
       let email = req.body.email;
       let password = req.body.password;
   
       User.findByCredentials(email, password).then((user) => {
           return user.createSession().then((refreshToken) => {
               // Session created successfully - refreshToken returned.
               // now we geneate an access auth token for the user
   
               return user.generateAccessAuthToken().then((accessToken) => {
                   // access auth token generated successfully, now we return an object containing the auth tokens
                   return { accessToken, refreshToken }
               });
           }).then((authTokens) => {
               // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
               res
                   .header('x-refresh-token', authTokens.refreshToken)
                   .header('x-access-token', authTokens.accessToken)
                   .send(user);
           })
       }).catch((err) => {
           res.status(400).send(err);
       });
   })

 /**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
router.get('/users/me/access-token', verifySession, (req, res) => {
       // we know that the user/caller is authenticated and we have the user_id and user object available to us
       req.userObject.generateAccessAuthToken().then((accessToken) => {
           res.header('x-access-token', accessToken).send({ accessToken });
       }).catch((err) => {
           res.status(400).send(err);
       });
   })


   // check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}
   
   
module.exports = router;
