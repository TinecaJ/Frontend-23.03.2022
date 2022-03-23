const mongoose = require ('mongoose');

var organizationsSchema = mongoose.Schema({

    Organization_name:String,
    Description:String,
    Policies:{type:mongoose.Types.ObjectId, 
      ref:"policies"},
    Context: {type:mongoose.Types.ObjectId, 
      ref:"contexts"},
    LeadershipandCom:{type:mongoose.Types.ObjectId, 
      ref:"LCs"},
    Riskdetermination:{type:mongoose.Types.ObjectId, 
      ref:"riskd"},
    Users:{type:mongoose.Types.ObjectId, 
      ref:"users"},
    Users: {type:mongoose.Types.ObjectId, 
        ref:"users"},
    Support: {type:mongoose.Types.ObjectId, 
      ref:"support"},
    Operations:{type:mongoose.Types.ObjectId, 
      ref:"operations"},
    ObjectiveID: {type:mongoose.Types.ObjectId, 
      ref:"objectives"},
    RR:{type:mongoose.Types.ObjectId, 
      ref:"RRs"}

    
  });
  
  var organizationsModel = mongoose.model("organizations", organizationsSchema);

  module.exports = organizationsModel;