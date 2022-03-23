const mongoose = require ('mongoose'); // calling the mongoose library
const policiesModel= require('../models/policies.model'); //calling the users schema created 

exports.get_confirmation=(req, res, next)=> {
    res.send('The policies have sucessfully been connected');
  }

exports.get_add=(req, res, next) =>{
    //create the data that should be added
      let newpolicies= new policiesModel({
        Objectives:req.body.Objectives,
        Appropriate:req.body.Appropriate,
        CommitmentReq:req.body.CommitmentReq,
        CommitmentImprov:req.body.CommitmentImprov,
        Available:req.body.Available,
        CommunicatedOrg:req.body.CommunicatedOrg,
        AvailableParties:req.body.AvailableParties,
        Other:req.body.Other,
        Othertxt:'Null',
        PolicyUpload:'Null',
        _userId: req.user_id
    
      });
    //How to save data 
      newpolicies.save(function(err, newpolicies){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newpolicies});
    
    
      });
      
    }

    exports.get_list=(req, res, next)=>{
    
        //How to save data 
          policiesModel.find({_userId: req.user_id},function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, policies: response});
     
          });
     
         }
  
         exports.get_newlist=(req, res, next)=>{
    
          //How to save data 
            policiesModel.find(function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, policies: response});
       
            });
       
           }