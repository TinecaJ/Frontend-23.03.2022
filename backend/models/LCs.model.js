const mongoose = require ('mongoose');

var LCsSchema = mongoose.Schema({

Policy:Boolean,   
Integration:Boolean,
AvailabilityofResources:Boolean,
Communication:Boolean,
Improvement:Boolean,
Achievements: Boolean,
Demo:Boolean,
Leadership: Boolean,
Other: String,
_userId: {
  type: mongoose.Types.ObjectId,
  required: true
}
    
  });
  
  var LCsModel = mongoose.model("LCs", LCsSchema);

  module.exports = LCsModel;