const mongoose = require ('mongoose');

var roledetsSchema = mongoose.Schema({

Admin: String,
User: String

  });
  
  var roledetsModel = mongoose.model("roledets", roledetsSchema);

  module.exports = roledetsModel;