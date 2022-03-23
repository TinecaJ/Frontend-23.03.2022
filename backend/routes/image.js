const express = require('express');
var router = express.Router();
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
const mongoose = require("mongoose");
const path = require('path');
const imageModel= require('../models/image.model');
const User = require('../models/users.model'); //calling the users schema created 
const jwt = require('jsonwebtoken');
const { result } = require("lodash");


 // check whether the request has a valid JWT access token
 let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');
  
    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
  }




//STORAGE SETUP


// DB
const mongoURI = "mongodb://localhost:27017/ISMS";

// connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});
// Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          // first write a for loop and select the buf.file >> 
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
           
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

router.get('/check', function(req, res, next) {
    res.send('images route sucessful');
  });



router.post("/upload", upload.single("file"),authenticate,(req, res) => {
     res.json({file : req.file},{_userId: req.user_id})
    res.redirect("/")
  });

  router.post("/uploadprac", upload.single("file"), (req, res) => {
    res.json({file : req.body})
   res.redirect("/");
 });


/*
  router.get("/image/:filename",authenticate,(req, res) => {
    // console.log('id', req.params.id)
    
      gfs.find({
        filename: req.body.filename},{_userId: req.user_id}).then((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        //const filename = buf.toString("string") + path.extname(file.originalname);
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  });
*/
 router.route('/image/:filename')
        .get((req, res, next) => {
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });


  //GETS ALL THE FILES UPLOADED
  
  router.route('/files')
  .get((req, res, next) => {
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

  router.route('/filesauth')
  .get(authenticate,(req, res, next) => {
      imageModel.find({_userId: req.user_id},(err, files) => {
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



  //POST: Upload multiple files upto 3
  
  router.post('/multiple',upload.array('file', 3), (req, res, next) => {
          res.json({file : req.file})
          res.redirect("/");
          
      });
      
 var uploadMultiple = upload.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }]);

 router.post('/uploadfile', uploadMultiple, function (req, res, next) {
   
  res.json({file : req.file})
  res.redirect("/");

})
//Add image to collection--------------------------------------------------------------------------------------
router.route('/new')
.post(upload.single('file'),authenticate,(req, res, next) => {
    console.log(req.body);
    // check for existing images
  
    imageModel.findOne({ _id: req.body._id})
        .then((image) => {
            console.log(image);
            if (image) {
                return res.status(200).json({
                    success: false,
                    message: 'Image already exists',
                });
            }

            let newImage = new imageModel({
                caption: req.body.caption,
                filename: req.file.filename,
                fileId: req.file.id,
                _userId: req.user_id

            });
            
            newImage.save()
                .then((image) => {

                    res.status(200).json({
                        success: true,
                        image,
                    });
                })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
})
.get((req, res, next) => {
    imageModel.find({})
        .then(images => {
            res.status(200).json({
                success: true,
                images,
            });
        })
        .catch(err => res.status(500).json(err));
});


// Delete an image from the collection
    
router.route('/remove/:id')
        .get((req, res, next) => {
            imageModel.findOne({ _id: req.params.id })
                .then((image) => {
                    if (image) {
                        imageModel.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(200).json({
                                    success: true,
                                    message: `File with ID: ${req.params.id} deleted`,
                                });
                            })
                            .catch(err => { return res.status(500).json(err) });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: `File with ID: ${req.params.id} not found`,
                        });
                    }
                })
                .catch(err => res.status(500).json(err));
        });

router.get('/:id', function (req, res, next) {
     var id= req.params._id;
     var filePath = "localhost:3000/api/image/"; // Or format the path using the `id` rest param
     var fileName = "file"; // The default name the browser will use
        
            res.download(filePath, fileName);    
        });

module.exports = router;