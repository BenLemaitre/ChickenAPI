var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ChoregraphySchema = new Schema({
    name : String
});
module.exports = mongoose.model('Choregraphy', ChoregraphySchema);