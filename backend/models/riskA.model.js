const mongoose = require ('mongoose');

var riskASchema = mongoose.Schema({

    RiskLevel:String,
    RiskAupload: String,
    
    
  });
  
  var riskAModel = mongoose.model("riskA", riskASchema);

  module.exports = riskAModel;