const mongoose = require ('mongoose'); // calling the mongoose library
const PEsModel= require('../models/PEs.model'); //calling the users schema created


exports.get_confirmation=(req, res, next) =>{
    res.send('The PEs have sucessfully been connected');
  }
  exports.get_add=(req, res, next) =>{
      //create the data that should be added
        let newPEs= new PEsModel({
         
          RAndR:req.body.RAndR,
          RTndR: req.body.RTndR,
          Review:req.body.Review,
          confirm:req.body.confirm,
          _userId: req.user_id
        }
      );
      //How to save data 
        newPEs.save(function(err, newPEs){
          if(err)
          res.send(err);
          else
          res.send({mesaage:'This users route works', usersObj: newPEs});
      
      
        });
        
      }
    
      exports.get_list=(req, res, next)=> {
        
          //How to save data 
            PEsModel.find({_userId: req.user_id},function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, PEs: response});
       
            });
       
           }

    
           exports.get_newlist=(req, res, next)=> {
        
            //How to save data 
              PEsModel.find(function(err, response){
                if(err)
                res.send(err);
                else
                res.send({resultsfounds:response.length, PEs: response});
         
              });
         
             }