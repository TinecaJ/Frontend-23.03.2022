const mongoose = require ('mongoose');

var policiesSchema = mongoose.Schema({
Objectives:Boolean,
Appropriate:Boolean,
CommitmentReq:Boolean,
CommitmentImprov:Boolean,
Available:Boolean,
CommunicatedOrg:Boolean,
AvailableParties:Boolean,
Other:Boolean,
Othertxt:String,
PolicyUpload:String,
_userId: {
  type: mongoose.Types.ObjectId,
  required: true
}

  });
  
  var policiesModel = mongoose.model("policies", policiesSchema);

  module.exports = policiesModel;