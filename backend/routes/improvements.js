var express = require('express');
var router = express.Router();
const improvementsController= require('../controller/improvements');
const improvementsModel= require('../models/improvements.model'); //calling the users schema created 
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
router.get('/',authenticate, improvementsController.get_confirmation);

//post new improvements details for an organization
router.post('/add', authenticate, improvementsController.get_add);

//get a list of all entries 
router.get('/list',authenticate, improvementsController.get_list );

//get a list of all entries 
router.get('/listadmin',improvementsController.get_newlist );
//get by Id
router.get("/:id",(req,res,next)=>{
    improvementsModel.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})
//Delete by Id
router.delete("/:id",(req,res,next)=>{
    improvementsModel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "RD  deleted."});
    })
})

router.put('/:id', authenticate, (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    improvementsModel.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
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
    
            const result = await improvementsModel.findByIdAndUpdate(
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