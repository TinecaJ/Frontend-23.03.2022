const mongoose = require ('mongoose'); // calling the mongoose library
const imageModel= require('../models/image.model'); //calling the users schema created 
const User = require('../models/users.model'); //calling the users schema created 


exports.getauthlist=((req, res, next) => {
      gfs.find().toArray((err, files) => {
          if (!files || files.length === 0) {
              return res.status(200).json({
                  success: false,
                  message: 'No files available'
              });
          }

          files.map(file => {
              if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                  file.isImage = true;
                  
              } else {
                  file.isImage = false;
              }
          });

          res.status(200).json({
              success: true,
              files,
          });
      });
  });
