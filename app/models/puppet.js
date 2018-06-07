var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PuppetSchema = new Schema({
    name : String,
    btMac : String,
	btPw : String
});
module.exports = mongoose.model('Puppet', PuppetSchema);