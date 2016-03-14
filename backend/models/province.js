var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var provinceSchema = mongoose.Schema({
    name: String,
    country: {type: mongoose.Schema.ObjectId, ref: ('countryModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('province', provinceSchema);