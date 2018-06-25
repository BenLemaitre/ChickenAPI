var mongoose = require('mongoose');
var Schema = mongoose.Schema;

MovementSchema = new Schema({
    name : {
	    type: String,
	    required: true,
	    trim: true
  	},
    steps: {
      type: Number,
      required: false
    },
    time: {
      type: Number,
      required: false
    },
    direction: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    }
});
module.exports = mongoose.model('Movement', MovementSchema);
