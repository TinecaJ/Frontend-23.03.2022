const mongoose = require ('mongoose'); // calling the mongoose library
const rolesModel= require('../models/roles.model'); //calling the users schema created 
const User = require('../models/users.model'); //calling the users schema created 

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

exports.get_confirmation=(req, res, next)=>{
    res.send('This is roles');
  }

  exports.get_add=(req, res, next)=>{
    //create the data that should be added
      let newroles= new rolesModel({
        Job_title: req.body.Job_title,
        Responsibility: req.body.Responsibility,
        Position:req.body.Position,
        Name:req.body.Name,
        _userId: req.user_id
      });
    //How to save data 
      newroles.save(function(err, newroles){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newroles});
    
    
      });
      
    }

  exports.get_list=(req, res, next)=> {
  
    //How to save data 
      rolesModel.find({_userId: req.user_id},function(err, response){
        if(err)
        res.send(err);
        else
        res.send({resultsfounds:response.length, roles: response});
 
      });
 
     }

     exports.get_adminlist=(req, res, next)=> {
  
      //How to save data 
        rolesModel.find(function(err, response){
          if(err)
          res.send(err);
          else
          res.send({resultsfounds:response.length, roles: response});
   
        });
   
       }