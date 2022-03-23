const mongoose = require ('mongoose'); // calling the mongoose library
const RRsModel= require('../models/RRs.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=>{
    res.send('The RRs have sucessfully been connected');
  }


  exports.get_add=(req, res, next)=>{
    //create the data that should be added
      let newRRs= new RRsModel({
       
        Coordinating: true,
        Advising: true,
        Designing:true,
        Setting: true,
        Managing: true,
        Reviewing: true,
        Operation:true ,
        RRupload: 'Upload document here4'
      });
    //How to save data 
      newRRs.save(function(err, newRRs){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newRRs});
    
    
      });
      
    }

exports.get_list=(req, res, next)=>{
      
        //How to save data 
          RRsModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, RRs: response});
     
          });
     
         }
  