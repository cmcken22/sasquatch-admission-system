var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var residencySchema = mongoose.Schema({
    residency: String
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('residency', residencySchema);