const mongoose = require ('mongoose');

var rolesSchema = mongoose.Schema({

Job_title: String,
Responsibility: String,
Position:Number,
Name:String,
_userId: {
  type: mongoose.Types.ObjectId,
  required: true
}

  });
  
  var rolesModel = mongoose.model("roles", rolesSchema);

  module.exports = rolesModel;