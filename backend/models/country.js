var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var countrySchema = mongoose.Schema({
    name: String
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('country', countrySchema);