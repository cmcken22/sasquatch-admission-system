var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var citySchema = mongoose.Schema({
    name: String,
    province: {type: mongoose.Schema.ObjectId, ref: ('provinceModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('city', citySchema);