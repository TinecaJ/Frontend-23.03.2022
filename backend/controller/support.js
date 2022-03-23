const mongoose = require ('mongoose'); // calling the mongoose library
const supportModel= require('../models/support.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=> {
    res.send('The support router is sucessfully connected');
  }
  
  //HOW TO ADD DATA TO THE COLLECTION
exports.get_add=(req, res, next)=> {
      //create the data that should be added
        let newsupport= new supportModel({
          Resources: req.body.Resources,
          ResourcesUpload: req.body.ResourcesUpload,
          Resourcestick: req.body.Resourcestick,
          Competence: req.body.Competence,
          CompetenceUpload: req.body.CompetenceUpload,
          Competencetick: req.body.Competencetick,
          Awareness: req.body.Awareness,
          AwarenessUpload:req.body.AwarenessUpload,
          Awarenesstick: req.body.Awarenesstick,
          Communication: req.body.Communication,
          Comtick:req.body.Comtick,
          _userId: req.user_id
          
        });
      //How to save data 
        newsupport.save(function(err, newsupport){
          if(err)
          res.send(err);
          else
          res.send({mesaage:'This users route works', usersObj: newsupport});
      
      
        });
        
      }
  
  exports.get_list=(req, res, next)=> {
    
          //How to save data 
            supportModel.find({_userId: req.user_id},function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, support: response});
       
            });
       
           }


           exports.get_newlist=(req, res, next)=> {
    
            //How to save data 
              supportModel.find(function(err, response){
                if(err)
                res.send(err);
                else
                res.send({resultsfounds:response.length, support: response});
         
              });
         
             }
  
  
        
           exports.get_delete=(req,res,next)=>{
            const Id = req.query.userId;
                                
            //How to save data 
              supportModel.findByIdAndDelete(Id, function(err, response){
                if(err)
                res.send(err);
                else
                res.send({resultsfounds:response.length, users: response});
         
              });
         
             }
        