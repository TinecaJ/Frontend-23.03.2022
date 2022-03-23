const mongoose = require ('mongoose');

var supportSchema = mongoose.Schema({
Resources: String,
ResourcesUpload: String,
Resourcestick: Boolean,
Competence: String,
CompetenceUpload: String,
Competencetick:Boolean,
Awareness:String,
AwarenessUpload:String,
Awarenesstick: Boolean,
Communication: String,
Comtick:Boolean,
 // User Object Id required to verify routes
 _userId: {
  type: mongoose.Types.ObjectId,
  required: true
}
  });
  
  var supportModel = mongoose.model("support", supportSchema);

  module.exports = supportModel;