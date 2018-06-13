var mongoose = require('mongoose');
var Schema = mongoose.Schema;

PuppetSchema = new Schema({
    name : String,
    btMac : String,
	btPw : String,
	user: { 
		type: Schema.Types.ObjectId, ref: 'User'
	}
});
module.exports = mongoose.model('Puppet', PuppetSchema);