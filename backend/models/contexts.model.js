const mongoose = require ('mongoose');

var contextsSchema = mongoose.Schema({

Context:{
  type:String,
  required:true,
 
},
Interested_Parties:{
  type:String,
 
},
IP_upload:{
  type:String,
  
},
contexttick:{
  type:Boolean,
  
},
IPtick:{
  type:Boolean,
  
},
Scopetick:{
  type:Boolean,
  

},
Scope:{
  type:String,
  
},
ScopeUpload: {
  type:String,
  
  
},
 // User Object Id required to verify routes
 _userId: {
  type: mongoose.Types.ObjectId,
  required: true
}

 
  });
  
  var contextsModel = mongoose.model("contexts", contextsSchema);

  module.exports = contextsModel;