var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var programSchema = mongoose.Schema({
    name: String,
    code: String,
    subCode: String,
    rules: [{type: mongoose.Schema.ObjectId, ref: ('admissionRuleSchema')}],
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('academicprogramcode', programSchema);