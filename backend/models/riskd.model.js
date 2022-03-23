const mongoose = require ('mongoose');

var riskdSchema = mongoose.Schema({

Requirements: String,
Risk: String,
RiskOwner:String,
RiskAccecptance: String,
RiskAssessment:String,
RiskControl:String,
Justification:String,
 // User Object Id required to verify routes
 _userId: {
  type: mongoose.Types.ObjectId,
  required: true
}

  });
  
  var riskdModel = mongoose.model("riskd", riskdSchema);

  module.exports = riskdModel;