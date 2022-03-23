const mongoose = require ('mongoose'); // calling the mongoose library
const riskdModel= require('../models/riskd.model'); //calling the users schema created
const User = require('../models/users.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=> {
    res.send('The riskd router is sucessfully connected');
  }

exports.get_add=(req, res, next)=> {
    //create the data that should be added
      let newriskd= new riskdModel({
        Requirements: req.body.Requirements,
        Risk: req.body.Risk,
        RiskOwner:req.body.RiskOwner,
        RiskAccecptance: req.body.RiskAccecptance,
        RiskAssessment:req.body.RiskAssessment,
        RiskControl:req.body.RiskAssessment,
        Justification:req.body.RiskAssessment,
        _userId: req.user_id
      });
    //How to save data 
      newriskd.save(function(err, newriskd){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newriskd});
    
    
      });
      
    }

    exports.get_list=(req, res, next) =>{
    
        //How to save data 
          riskdModel.find({_userId: req.user_id},function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, riskd: response});
     
          });
     
         }
  
         exports.get_newlist=(req, res, next) =>{
    
          //How to save data 
            riskdModel.find(function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, riskd: response});
       
            });
       
           }
  
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

        
       
  