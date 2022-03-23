const mongoose = require ('mongoose'); // calling the mongoose library
const controlsModel= require('../models/controls.model'); //calling the users schema created 
const User = require('../models/users.model'); //calling the users schema created 


exports.get_confirmation=(req, res, next)=> {
    res.send('The contexts have sucessfully been connected');
     
      }
    
  

  exports.get_add=(req, res, next)=> {
    //create the data that should be added
      let newcontrols= new controlsModel({
        
        Control: req.body.Control,
        Reference: req.body.Reference,
        Risk:req.body.Risk,
        Justification:req.body.Justification,

        Control1: req.body.Control1,
        Reference1: req.body.Reference1,
        Risk1:req.body.Risk1,
        Justification1:req.body.Justification1,

        Control2: req.body.Control2,
        Reference2: req.body.Reference2,
        Risk2:req.body.Risk2,
        Justification2:req.body.Justification2,

        Control3: req.body.Control3,
        Reference3: req.body.Reference3,
        Risk3:req.body.Risk3,
        Justification3:req.body.Justification3,

        Control4: req.body.Control4,
        Reference4: req.body.Reference4,
        Risk4:req.body.Risk4,
        Justification4:req.body.Justification4,

        Control5: req.body.Control5,
        Reference5: req.body.Reference5,
        Risk5:req.body.Risk5,
        Justification5:req.body.Justification5,

        Control6: req.body.Control6,
        Reference6: req.body.Reference6,
        Risk6:req.body.Risk6,
        Justification6:req.body.Justification6,

        Control7: req.body.Control7,
        Reference7: req.body.Reference7,
        Risk7:req.body.Risk7,
        Justification7:req.body.Justification7,

        Control8: req.body.Control8,
        Reference8: req.body.Reference8,
        Risk8:req.body.Risk8,
        Justification8:req.body.Justification8,

        Control9: req.body.Control9,
        Reference9: req.body.Reference9,
        Risk9:req.body.Risk9,
        Justification9:req.body.Justification9,

        Control10: req.body.Control10,
        Reference10: req.body.Referenceq10,
        Risk10:req.body.Risk10,
        Justification10:req.body.Justification10,
    
       
       
      });
    //How to save data 
      newcontrols.save(function(err, newcontrols){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newcontrols});
    
    
      });
      
    }