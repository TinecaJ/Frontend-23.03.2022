const mongoose = require ('mongoose'); // calling the mongoose library
const riskAModel= require('../models/riskA.model'); //calling the users schema created 
const riskdModel = require('../models/riskd.model');


exports.get_confirmation=(req, res, next)=> {
    res.send('The riskA router is sucessfully connected');
  }

exports.get_add=(req, res, next)=>{
    //create the data that should be added
      let newriskA= new riskAModel({
        RiskLevel:req.body.RiskLevel,
        RiskAupload: req.body.RiskAupload,
      
       
    
      });
    //How to save data 
      newriskA.save(function(err, newriskA){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newriskA});
    
    
      });
      
    }

    exports.get_list=(req, res, next)=> {
    
        //How to save data 
          riskAModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, riskA: response});
     
          });
  
        }