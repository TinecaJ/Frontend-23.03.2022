const mongoose = require ('mongoose');

var riskCSchema = mongoose.Schema({

    RiskControl:String,
    Justification:String,
    RiskCupload:String,
    RiskCSignature: String,
    
    RiskControl: {type:mongoose.Types.ObjectId, 
      ref:"controls"}
    
  });
  
  var riskCModel = mongoose.model("riskC", riskCSchema);

  module.exports = riskCModel;