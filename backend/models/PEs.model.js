const mongoose = require ('mongoose');
const { stringify } = require('querystring');

var PEsSchema = mongoose.Schema({
    
    RAndR:String,
    RTndR:String,
    Review:String,
    confirm:Boolean,
    _userId: {
      type: mongoose.Types.ObjectId,
      required: true
    }
    
  

  });
  PEsSchema.set('timestamps', true);
  
  var PEsModel = mongoose.model("PEs", PEsSchema);

  module.exports = PEsModel;