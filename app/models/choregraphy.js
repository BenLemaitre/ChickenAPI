var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ChoregraphySchema = new Schema({
    name : {
	    type: String,
	    required: true,
	    trim: true
  	},
    user: { 
		type: Schema.Types.ObjectId, ref: 'User',
		required: true
	},
	movement : [{ 
		type: Schema.Types.ObjectId, ref: 'Movement' 
	}]
});
module.exports = mongoose.model('Choregraphy', ChoregraphySchema);