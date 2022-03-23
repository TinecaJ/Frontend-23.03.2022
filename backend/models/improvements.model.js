const mongoose = require ('mongoose');
var improvementsSchema = mongoose.Schema({



Non_Conformity:Boolean,
CorrectiveAction:Boolean,
Upload:String,
Text:String,
 // User Object Id required to verify routes
 _userId: {
  type: mongoose.Types.ObjectId,
  required: true
}


    
  });
  
  var improvementsModel = mongoose.model("improvements", improvementsSchema);

  module.exports = improvementsModel;