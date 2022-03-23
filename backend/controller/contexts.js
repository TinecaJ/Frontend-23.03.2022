const mongoose = require ('mongoose'); // calling the mongoose library
const contextsModel= require('../models/contexts.model'); //calling the users schema created 
const User = require('../models/users.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=> {
    res.send('The contexts have sucessfully been connected');
     req.user_id
      }
    
  

  exports.get_add=(req, res, next)=> {
    //create the data that should be added
      let newcontexts= new contextsModel({
       
        Context: req.body.Context,
        Interested_Parties:req.body.Interested_Parties,
        IP_upload:req.body.IP_upload,
        contexttick:req.body.contexttick,
        IPtick:req.body.IPtick,
        Scopetick:req.body.Scopetick,
        Scope:req.body.Scope,
        ScopeUpload: req.body.ScopeUpload,
        _userId: req.user_id
      });
    //How to save data 
      newcontexts.save(function(err, newcontexts){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newcontexts});
    
    
      });
      
    }

exports.get_list=(req, res, next)=> {
      
        //How to save data 
        //Requesting the list of data entered by a specific user
          contextsModel.find({_userId: req.user_id},function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, contexts: response});
     
          });
     
         }
    
         exports.get_newlist=(req, res, next)=> {
      
          //How to save data 
          //Requesting the list of data entered by a specific user
            contextsModel.find(function(err, response){
              if(err)
              res.send(err);
              else
              res.send({resultsfounds:response.length, contexts: response});
       
            });
       
           }

   exports.get_delete=(req,res,next)=>{
    const Id = req.query.userId;
                        
    //How to save data 
      contextsModel.findByIdAndDelete(Id, function(err, response){
        if(err)
        res.send(err);
        else
        res.send({resultsfounds:response.length, users: response});
 
      });
 
     }

    exports.get_edit= async (req, res) => {
      try {
          const id = req.params.id;
          const updatedData = req.body;
          const options = { new: true };
  
          const result = await contextsModel.findByIdAndUpdate(
            id, updatedData, options)
  
          res.send(result)
      }
      catch (error) {
          res.status(400).json({ message: error.message })
      }
    }
   // check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
  let token = req.header('x-access-token');

  // verify the JWT
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
      if (err) {
          // there was an error
          // jwt is invalid - * DO NOT AUTHENTICATE *
          res.status(401).send(err);
      } else {
          // jwt is valid
          req.user_id = decoded._id;
          next();
      }
  });
}

        