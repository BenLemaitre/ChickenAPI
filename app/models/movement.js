var mongoose = require('mongoose');
var Schema = mongoose.Schema;
MovementSchema = new Schema({
    name : String
});
module.exports = mongoose.model('Movement', MovementSchema);