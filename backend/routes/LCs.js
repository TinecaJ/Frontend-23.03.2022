var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const LCsModel= require('../models/LCs.model'); //calling the users schema created
const LCsController = require( '../controller/LCs'); 
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
router.get('/',authenticate,LCsController.get_confirmation);

router.post('/add',authenticate, LCsController.get_add );
  
router.get('/list',authenticate, LCsController.get_list );

router.get('/listadmin', LCsController.get_newlist );


//get by Id
router.get("/:id",(req,res,next)=>{
    LCsModel.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})
//Delete by Id
router.delete("/:id", (req,res,next)=>{
    LCsModel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "RD  deleted."});
    })
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await LCsModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;