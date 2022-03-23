const mongoose = require ('mongoose');

var operationsSchema = mongoose.Schema({

PndI:String,
RAndI:String,
RTndI:String,
PItick:Boolean,
AItick:Boolean,
RTItick:Boolean,
 // User Object Id required to verify routes
 _userId: {
  type: mongoose.Types.ObjectId,
  required: true
}



  });
  
  var operationsModel = mongoose.model("operations", operationsSchema);

  module.exports = operationsModel;