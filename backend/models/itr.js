var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var itrSchema = mongoose.Schema({
    order: Number,
    eligibility: String,
    academicprogramcode: {type: mongoose.Schema.ObjectId, ref: ('programModel')},
    student: {type: mongoose.Schema.ObjectId, ref: ('studentModel')}
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('itr', itrSchema);