const mongoose = require ('mongoose');

var internalsSchema = mongoose.Schema({

   
    Context:Boolean,
    LC:Boolean,
    Policy:Boolean,
    Org:Boolean,
    RC:Boolean,
    Support:Boolean,
    Operation:Boolean,
    PE:Boolean,
    Improvement:Boolean,
    OrganizationID: {type:mongoose.Types.ObjectId, 
      ref:"organizations"}
    
  });
  
  var internalsModel = mongoose.model("internals", internalsSchema);

  module.exports = internalsModel;