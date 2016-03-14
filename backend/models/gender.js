var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var genderSchema = mongoose.Schema({
    sex: String
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('gender', genderSchema);