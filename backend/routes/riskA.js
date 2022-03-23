var express = require('express'); // calling the express library (confirm this)
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const riskAModel= require('../models/riskA.model'); //calling the users schema created 
const riskdModel = require('../models/riskd.model');
const riskAController = require('../controller/riskA');
const toID = mongoose.Types.ObjectId

/* GET users listing. */
router.get('/', riskAController.get_confirmation);

//HOW TO ADD DATA TO THE COLLECTION
router.post('/add', riskAController.get_add);
  
router.get('/list', riskAController.get_list );
  /*
        router.get('/risksnew', (req, res) => {

         res.json(await  riskAModel.find({}).populate('riskd')
          )
          });
        
   
       });



       router.get('/link/:riskA/:riskd',async(req, res) =>{
       req.params.riskd=toID(req.params.riskd);

       const risklink= await riskA.findById(req.params.riskA);
       riskA.riskd= req.params.riskd;
       riskA.save();

       res.json(riskA);
           });
     */ 
          
module.exports = router;