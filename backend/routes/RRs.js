var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const RRsModel= require('../models/RRs.model'); //calling the users schema created 
const RRsController = require( '../controller/RRs');

/* GET users listing. */
router.get('/', RRsController.get_confirmation);

router.post('/add', RRsController.get_add);

      router.get('/list', RRsController.get_list);

module.exports = router;