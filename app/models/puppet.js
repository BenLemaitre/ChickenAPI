var mongoose = require('mongoose');
var Schema = mongoose.Schema;

PuppetSchema = new Schema({
    name : {
	    type: String,
	    required: true,
	    trim: true
  	},
    btMac : {
	    type: String,
	    required: true,
	    trim: true
  	},
	btPw : String,
	user: { 
		type: Schema.Types.ObjectId, ref: 'User',
		required: true
	}
});
module.exports = mongoose.model('Puppet', PuppetSchema);