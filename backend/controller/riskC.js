const mongoose = require ('mongoose'); // calling the mongoose library
const riskCModel= require('../models/riskC.model'); //calling the users schema created 

exports.get_confirmation=(req, res, next)=> {
    res.send('RiskC successfully connected');
  }

  exports.get_add=(req, res, next)=> {
    //create the data that should be added
      let newriskC= new riskCModel({
        RiskControl:req.body.RiskControl,
        Justification:req.body.Justification,
        RiskCupload:req.body.RiskCupload,
        RiskCSignature: req.body.RiskCSignature,
        RiskAssessment: '',
        RiskControl: ''
      });
    //How to save data 
      newriskC.save(function(err, newriskC){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newriskC});
    
    
      });
      
    }

exports.get_list=(req, res, next)=>{
    
        //How to save data 
          riskCModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, riskC: response});
     
          });
     
         }
  