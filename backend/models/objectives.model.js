const mongoose = require ('mongoose');

var objectivesSchema = mongoose.Schema({

   
Text:String,
Upload:String,
Check:Boolean,
    

  });
  
  var objectivesModel = mongoose.model("objectives", objectivesSchema);

  module.exports = objectivesModel;