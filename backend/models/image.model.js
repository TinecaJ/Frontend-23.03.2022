const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    caption: {
       
    },
    filename: {
       
    },
    fileId: {
       
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
     // User Object Id required to verify routes
 _userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const imageModel = mongoose.model('image', ImageSchema);

module.exports = imageModel;