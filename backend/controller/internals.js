const mongoose = require ('mongoose'); // calling the mongoose library
const internalsModel= require('../models/internals.model'); //calling the users schema created 
const organizationsModel= require('../models/organizations.model'); //calling the users schema created\

//Confirm that routes will work successfully
exports.get_internals= (req, res, next) =>{
    res.send('The internals have sucessfully been connected');
  }

//post new internal details for an organization
exports.get_new=(req, res, next)=> {
    //create the data that should be added
      let newinternals= new internalsModel({
       
    Context:true,
    LC:true,
    Policy:true,
    Org:true,
    RC:true,
    Support:true,
    Operation:true,
    PE:true,
    Improvement:true,
    OrganizationID:'61d32a68d4afdab6f85cebbe'
      });
    //How to save data 
      newinternals.save(function(err, newinternals){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newinternals});
    
    
      });
      
    }

    //list of all internals entered into the database
    exports.get_list=(req, res, next)=> {
      
        //How to save data 
          internalsModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, internals: response});
     
          });
     
         }

         //Get internal checklist of an organizaton by organization ID
         exports.get_byorgID=(req, res, next)=> {
            const orgID = req.query.OrganizationID
             //How to save data 
               organizationsModel.find({OrganizationID:orgID},function(err, response){
                 if(err)
                 res.send(err);
                 else
                 res.send({resultsfounds:response.length, internals: response});
          
               });
          
              }