var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var programSchema = mongoose.Schema({
    name: String,
    code: String,
    subCode: String,
    acceptionCode: {type: mongoose.Schema.ObjectId, ref: ('commentCodeShema')},
    rules: [{type: mongoose.Schema.ObjectId, ref: ('admissionRuleSchema')}],
    minAverage:Number,
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('academicprogramcode', programSchema);