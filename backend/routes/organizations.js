var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library
const organizationsModel= require('../models/organizations.model'); //calling the users schema created 
const organizationsController = require( '../controller/organizations');

/* GET users listing. */
router.get('/', organizationsController.get_confirmation);
 //Searh for all organizations
 router.get('/list',organizationsController.get_list );

 //Search for an organization by name
 router.get('/searchbyname', organizationsController.get_organizationname);

 //Search for an organizaartion by ID route
 router.get('/searchbyID', organizationsController.get_ID);

 //Search context of org by ID
 router.get('/orgcontext/:id', organizationsController.get_contoforg )

 //get all the details of a specific organization by ID
 router.get('/orgdets/:id',organizationsController.get_orgdets);

  //Search policies of org by ID
  router.get('/orgpolicies/:id', organizationsController.get_polsoforg )

//Search policies of org by ID
router.get('/orgoperations/:id', organizationsController.get_opsoforg )

//Search Description of org by ID
router.get('/orgdescriptions/:id', organizationsController.get_desoforg )




 


router.post('/add', function(req, res, next) {
    //create the data that should be added
      let neworganizations= new organizationsModel({
       
        Organization_name:String,
        Description:String,
        
    Policies:'61c1c839aa5d7303075ce0b1',
    Context: '61d31fbe65a23919446ba2e4',
    LeadershipandCom:'61d2efcef678509944983747',
    Riskdetermination:'61c1b03b79c33abf87e7fc49',
    Users: '61d2f8c248c5632e70dad73b',
    Support: '61c1ab78a6823a0ecc252b7d',
    Operations:'61d2faa4ac57ed4a37bb4906',
    ObjectiveID: '61c1d0576d603ba44101c6b4',
    RR:'61c25b25eafa51284b1e4cf0'

      });
    //How to save data 
      neworganizations.save(function(err, neworganizations){
        if(err)
        res.send(err);
        else
        res.send({mesaage:'This users route works', usersObj: neworganizations});
    
    
      });
      
    });


      

      

            
    


          
        

module.exports = router;