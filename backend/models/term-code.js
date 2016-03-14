var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var termCodeSchema = mongoose.Schema({
    name: String
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('termCode', termCodeSchema);