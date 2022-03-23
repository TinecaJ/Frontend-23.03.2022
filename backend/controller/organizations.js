var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose'); // calling the mongoose library

const organizationsModel= require('../models/organizations.model'); //calling the users schema created\
const policiesModel= require('../models/policies.model'); //calling the users schema created 
const contextsModel= require('../models/contexts.model'); //calling the users schema created 
const riskdModel= require('../models/riskd.model'); //calling the users schema created 
const LCsModel= require('../models/LCs.model'); //calling the users schema created 
const usersModel= require('../models/users.model'); //calling the users schema created 
const operationsModel= require('../models/operations.model'); //calling the users schema created 
const RRsModel= require('../models/RRs.model'); //calling the users schema created 
const objectivesModel= require('../models/objectives.model'); //calling the users schema created 




exports.get_confirmation= (req, res, next)=> {
    res.send('The organizations have sucessfully been connected');
  }


  exports.get_add= (req, res, next) =>{
    
//create the data that should be added
      let neworganizations= new organizationsModel({
       
        Organization_name: 'orgd',
        Description:'just practice',
        
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
    }

    exports.get_list= (req, res, next) => {
      
 //How to save data 
          organizationsModel.find(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, organizations: response});
     
          });
     
         }
 //Search by Organization Name
         exports.get_organizationname=(req, res, next)=> {
            const orgname = req.query.Organization_name
             //How to save data 
               organizationsModel.find({Organization_name: orgname},function(err, response){
                 if(err)
                 res.send(err);
                 else
                 res.send({resultsfounds:response.length, organizations: response});
          
               });
          
              }

//Search by ID 
         exports.get_ID= (req, res, next) =>{
              
            const orgID = req.query.id
             //How to save data 
               organizationsModel.findById(orgID,(err, response) => {
                   if (err)
                     res.send(err);

                   else
                     res.send({ resultsfounds: response.length, organizations: response });

                 });
          
              }

//contect of organition by ID
        
        exports.get_contoforg = function (req, res) {
            console.log("This organization");
            // this code allows me to remove id and Scope
            organizationsModel.findById({ _id: req.params.id }).populate('Context','-_id -Scope -IPtick -IP_upload -contexttick -Scopetick -ScopeUpload ').select('Context')
                .exec(function (err, response) {
                    if (err)
                        res.send(err);

                    else
                        res.send({ resultsfounds: response.length, users: response });

                });

        }

    
        exports.get_orgdets=(req,res)=>{
          console.log("This organization");
          
          organizationsModel.findById({_id: req.params.id}).populate(['Context','Support'])
          .exec(function(err, response){
            if(err)
            res.send(err);
            else
            res.send({resultsfounds:response.length, users: response});

        });

      }

//Policies of an organization by ID
      exports.get_polsoforg = function (req, res) {
        console.log("This organization");
        // this code allows me to remove id and Scope
        organizationsModel.findById({ _id: req.params.id }).populate('Policies').select('Policies')
            .exec(function (err, response) {
                if (err)
                    res.send(err);

                else
                    res.send({ resultsfounds: response.length, users: response });

            });

    }

//Operations of an organization by ID
exports.get_opsoforg = function (req, res) {
  console.log("This organization");
  // this code allows me to remove id and Scope
  organizationsModel.findById({ _id: req.params.id }).populate('Operations').select('Operations')
      .exec(function (err, response) {
          if (err)
              res.send(err);

          else
              res.send({ resultsfounds: response.length, users: response });

      });

}

//Descriptions of an organization by ID
exports.get_desoforg = function (req, res) {
  console.log("This organization");
  // this code allows me to remove id and Scope
  organizationsModel.findById({ _id: req.params.id }).populate('Description').select('Description')
      .exec(function (err, response) {
          if (err)
              res.send(err);

          else
              res.send({ resultsfounds: response.length, users: response });

      });

}
