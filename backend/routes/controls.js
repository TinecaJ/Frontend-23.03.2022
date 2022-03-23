var express = require('express'); // calling the express library (confirm this)
var router = express.Router();
const controlsController = require( '../controller/controls');
const controlsModel= require('../models/controls.model'); //calling the users schema created 


router.post('/add',controlsController.get_add);
  //HOW TO GET DATA /SPECIFIC DATA FROM A COLLECTION
  
  router.get('/list', function(req, res, next) {
    
     //How to save data 
       controlsModel.find(function(err, response){
         if(err)
         res.send(err);
         else
         res.send({resultsfounds:response.length, controls_found: response});
  
       });
  
      });
module.exports = router;