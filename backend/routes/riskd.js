var express = require('express'); // calling the express library (confirm this)
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const riskdModel= require('../models/riskd.model'); //calling the users schema created 
const riskdController= require('../controller/riskd');
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
router.get('/',authenticate, riskdController.get_confirmation);


//HOW TO ADD DATA TO THE COLLECTION
router.post('/add',authenticate, riskdController.get_add);

router.get('/list',authenticate, riskdController.get_list);

router.get('/listadmin', riskdController.get_newlist);

//Uses this function when router.use() is called

//get by Id
router.get("/:id",(req,res,next)=>{
    riskdModel.findById({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})
//Delete by Id
router.delete("/:id", (req,res,next)=>{
    riskdModel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(201).json({message: "RD  deleted."});
    })
})

/*
router.put("/:id",async(req,res,next)=>{
    console.log(req.params.id);
    const options={new:true};
    
    const result= await riskdModel.findByIdAndUpdate(req.params.id,{
        $set:{
            Requirements: req.body.Requirements,
            Risk: req.body.Risk,
            RiskOwner:req.body.RiskOwner,
            RiskAccecptance: req.body.RiskAccecptance
        }
    },
        options)
        if(!result)
        return res.send('not created')
        res.send(result);
    });
*/
    router.put('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
    
            const result = await riskdModel.findByIdAndUpdate(
                id, updatedData, options
            )
    
            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

/*
router.patch("/:id", async(req,res,next)=>{
try{
    
   const updates=req.body;
   const options={new:true};

   const result= riskdModel.findByIdAndUpdate({_id:req.params.id},{
    $set:{
        Requirements: req.body.Requirements,
        Risk: req.body.Risk,
        RiskOwner:req.body.RiskOwner,
        RiskAccecptance: req.body.RiskAccecptance
    },}}})
*/

module.exports = router;