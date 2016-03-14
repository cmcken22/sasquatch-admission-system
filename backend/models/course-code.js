var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var courseCodeSchema = mongoose.Schema({
    code: String,
    number: String,
    name: String,
    unit: String,
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('courseCode', courseCodeSchema);