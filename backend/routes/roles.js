var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const rolesModel= require('../models/roles.model'); //calling the users schema created 
const rolesController = require( '../controller/roles');
const User = require('../models/users.model'); //calling the users schema created 
const jwt = require('jsonwebtoken');


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


/* GET users listing. */
router.get('/',authenticate,rolesController.get_confirmation );


//HOW TO ADD DATA TO THE COLLECTION
router.post('/add',authenticate, rolesController.get_add);

  router.get('/list',authenticate, rolesController.get_list );
  router.get('/listadmin', rolesController.get_adminlist );

  router.delete("/:id",(req,res,next)=>{
    rolesModel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "role deleted."});
    })
})

//get by Id
router.get("/:id",(req,res,next)=>{
    rolesModel.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
        
    })
})

/**
 * Put 
 * Purpose: Update context entry
 */
 router.put('/:id', authenticate, (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    rolesModel.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});
/*
 router.put('/:id', authenticate, (req, res) => {

    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

rolesModel.findByIdAndUpdate({_userId: req.user_id},{_userId: req.user_id },
        id, updatedData, options
    ).then(result => {
        res.send({ 'message': 'updated successfully'});
        res.send(result)
    });
});
    
*/

module.exports = router;