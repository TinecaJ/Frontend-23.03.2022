var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const objectivesModel= require('../models/objectives.model'); //calling the users schema created 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('The objectives have sucessfully been cOnnected');
});

router.post('/add', function(req, res, next) {
    //create the data that should be added
      let newobjectives= new objectivesModel({
        Text:'Data should be entered here 13',
        Upload:'Upload Docs 13',
        Check:true,  
    
      });
    //How to save data 
      newobjectives.save(function(err, newobjectives){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: newobjectives});
    
    
      });
      
    });
  
      router.get('/list', function(req, res, next) {
      
        //How to save data 
          objectivesModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, objectives: response});
     
          });
     
         });

module.exports = router;