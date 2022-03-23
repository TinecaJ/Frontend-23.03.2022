const mongoose = require ('mongoose');

var imagesSchema = mongoose.Schema({

    name:
    {type:String, 
    required:true
    },
/*
    image: {
      data: Buffer,
      contentType: String
    }
    
    */
  });
  
  var imagesModel = mongoose.model("images", imagesSchema);

  module.exports = imagesModel;