const mongoose = require ('mongoose'); // calling the mongoose library
const LCsModel= require('../models/LCs.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=> {
    res.send('The LCs have sucessfully been connected');
  }


exports.get_add=(req, res, next) =>{
    //create the data that should be added
      let newLCs= new LCsModel({
        Policy:req.body.Policy,   
        Integration:req.body.Integration,
        AvailabilityofResources:req.body.AvailabilityofResources,
        Communication:req.body.Communication,
        Improvement:req.body.Improvement,
        Achievements: req.body.Achievements,
        Demo:req.body.Demo,
        Leadership: req.body.Leadership,
        Other:req.body.Other,
        _userId: req.user_id
        
      });
    //How to save data 
      newLCs.save(function(err, newLCs){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newLCs});
    
    
      });
      
    }

    exports.get_list=(req, res, next) =>{
      
        //How to save data 
          LCsModel.find({_userId: req.user_id},function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, LCs: response});
     
          });
     
         }

         exports.get_newlist=(req, res, next) =>{
      
          //How to save data 
            LCsModel.find(function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, LCs: response});
       
            });
       
           }