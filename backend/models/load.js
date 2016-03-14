var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var academicLoadSchema = mongoose.Schema({
    load: String
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('load', academicLoadSchema);