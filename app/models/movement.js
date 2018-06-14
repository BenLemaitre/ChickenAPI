var mongoose = require('mongoose');
var Schema = mongoose.Schema;

MovementSchema = new Schema({
    name : {
	    type: String,
	    required: true,
	    trim: true
  	}
});
module.exports = mongoose.model('Movement', MovementSchema);