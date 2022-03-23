var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const internalsModel= require('../models/internals.model'); //calling the users schema created 
const internalsController = require( '../controller/internals');


/* GET internals confirimation */
router.get('/', internalsController.get_internals);

//post new internal details for an organization
router.post('/add',internalsController.get_new);

//get a list of all entries 
router.get('/list',internalsController.get_list );

//Get internals by orgID
router.get('/intbyID',internalsController.get_byorgID )

module.exports = router;