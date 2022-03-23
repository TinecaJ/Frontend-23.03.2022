var express = require('express'); // calling the express library (confirm this)
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const supportModel= require('../models/support.model'); //calling the users schema created 
const supportController= require('../controller/support');
const support = require("../models/support.model");
const User = require('../models/users.model'); //calling the users schema created 
const jwt = require('jsonwebtoken');
const { result } = require("lodash");


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

router.get('/',authenticate, supportController.get_confirmation);

//post new internal details for an organization
router.post('/add',authenticate, supportController.get_add);

//get a list of all entries 
router.get('/list',authenticate, supportController.get_list );

router.get('/listadmin',authenticate, supportController.get_newlist );
router.get("/:id",(req,res,next)=>{
    support.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})

router.delete("/:id",(req,res,next)=>{
    support.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "support part deleted."});
    })
})
router.put('/:id', authenticate, (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
   support.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});
/*
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await support.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

*/
module.exports = router;