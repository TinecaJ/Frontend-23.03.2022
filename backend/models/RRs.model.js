const mongoose = require ('mongoose');

var RRsSchema = mongoose.Schema({

Coordinating:Boolean,
Advising:Boolean,
Designing:Boolean,
Setting:Boolean,
Managing:Boolean,
Reviewing:Boolean,
Operation:Boolean,
RRupload: String

  });
  
  var RRsModel = mongoose.model("RRs", RRsSchema);

  module.exports = RRsModel;