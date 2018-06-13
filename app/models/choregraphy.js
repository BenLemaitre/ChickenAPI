var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ChoregraphySchema = new Schema({
    name : String,
    user: { 
		type: Schema.Types.ObjectId, ref: 'User'
	},
	movement : [{ 
		type: Schema.Types.ObjectId, ref: 'Movement' 
	}]
});
module.exports = mongoose.model('Choregraphy', ChoregraphySchema);