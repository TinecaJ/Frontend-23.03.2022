var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const riskCModel= require('../models/riskC.model'); //calling the users schema created 
const riskCController= require('../controller/riskC'); //calling the users schema created 

/* GET users listing. */
router.get('/', riskCController.get_confirmation);

//HOW TO ADD DATA TO THE COLLECTION
router.post('/add', riskCController.get_add);
  
router.get('/list', riskCController.get_list );


module.exports = router;