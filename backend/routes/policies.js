
var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const policiesModel= require('../models/policies.model'); //calling the users schema created 
const policiesController = require( '../controller/policies');
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
router.get('/',authenticate,policiesController.get_confirmation);

//HOW TO ADD DATA TO THE COLLECTION
router.post('/add', authenticate, policiesController.get_add );

 router.get('/list',authenticate, policiesController.get_list );

 router.get('/listadmin',policiesController.get_newlist );
//get by Id
router.get("/:id",(req,res,next)=>{
    policiesModel.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})
//Delete by Id
router.delete("/:id", (req,res,next)=>{
    policiesModel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "Policy deleted  deleted."});
    })
})


    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
    
            const result = await policiesModel.findByIdAndUpdate(
                id, updatedData, options
            )
    
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

module.exports = router;