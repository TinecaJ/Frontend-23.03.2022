const express = require("express");
const router = express.Router();
const contextsController = require( '../controller/contexts');
const contexts = require("../models/contexts.model");
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

  let roleauth =(req, res, next) => {
      if (req.body._id !=='622801013b5edef036ca5efc'){
         
      }
      next()
    }

/* GET users listing. */
router.get('/',authenticate, contextsController.get_confirmation);

router.post('/add',authenticate, contextsController.get_add);
  
router.get('/list',authenticate,contextsController.get_list)

router.get('/listun',contextsController.get_newlist)

router.get('/del',contextsController.get_delete)

router.put('/:id', contextsController.get_edit)

//get by Id
router.get("/:id",(req,res,next)=>{
    contexts.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
        
    })
})
router.delete("/:id",authenticate,(req,res,next)=>{
    contexts.deleteOne({_id:req.params.id},{_userId: req.user_id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "Context part deleted."});
    })
})
/**
 * Put 
 * Purpose: Update context entry
 */

router.put('/:id',authenticate, (req, res) => {

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

    contexts.findByIdAndUpdate({_userId: req.user_id,_userId: req.user_id },
            id, updatedData, options
        ).then(result => {
            res.send({ 'message': 'updated successfully'});
            res.send(result)
        });
    });
    




/*
router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await contexts.findByIdAndUpdate({_userId: req.user_id},{_userId: req.user_id },
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