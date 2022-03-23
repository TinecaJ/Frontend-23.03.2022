const mongoose = require ('mongoose'); // calling the mongoose library
const operationsModel= require('../models/operations.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next) =>{
    res.send('The operations have sucessfully been connected');
  }
  
  //HOW TO ADD DATA TO THE COLLECTION
  exports.get_add=(req, res, next) =>{
      //create the data that should be added
        let newoperations= new operationsModel({
          PndI:req.body.PndI,
          RAndI:req.body.RAndI,
          RTndI:req.body.RTndI,
          PItick:req.body.PItick,
          AItick:req.body.AItick,
          RTItick:req.body.RTItick,
          UploadSection:req.body.UploadSection,
          _userId: req.user_id
      
        });
      //How to save data 
        newoperations.save(function(err, newoperations){
          if(err)
          res.send(err);
          else
          res.send({mesaage:'This users route works', usersObj: newoperations});
      
      
        });
        
      }
    
      exports.get_list=(req, res, next)=> {
        
          //How to save data 
            operationsModel.find({_userId: req.user_id},function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, operations: response});
       
            });
       
           }
    

           exports.get_newlist=(req, res, next)=> {
        
            //How to save data 
              operationsModel.find(function(err, response){
                if(err)
                res.send(err);
                else
                res.send({resultsfounds:response.length, operations: response});
         
              });
         
             }
      