const mongoose = require ('mongoose'); // calling the mongoose library
const improvementsModel= require('../models/improvements.model'); //calling the users schema created 

exports.get_confirmation=(req, res, next)=>{
    res.send('The improvements have sucessfully been connected');
  }
  
exports.get_add=(req, res, next)=> {
      //create the data that should be added
        let newimprovements= new improvementsModel({
         
          Non_Conformity:req.body.Non_Conformity,
          CorrectiveAction:req.body.CorrectiveAction,
          Upload:req.body.Upload,
          Text:req.body.Text,
          _userId: req.user_id
        });
      //How to save data 
        newimprovements.save({_userId: req.user_id},function(err, newimprovements){
          if(err)
          res.send(err);
          else
          res.send({mesaage:'This users route works', usersObj: newimprovements});
      
      
        });
        
      }
    
    exports.get_list=(req, res, next)=>{
        
          //How to save data 
            improvementsModel.find({_userId: req.user_id},function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, improvements: response});
       
            });
       
           }
           exports.get_newlist=(req, res, next)=>{
        
            //How to save data 
              improvementsModel.find(function(err, response){
                if(err)
                res.send(err);
                else
                res.send({resultsfounds:response.length, improvements: response});
         
              });
         
             }