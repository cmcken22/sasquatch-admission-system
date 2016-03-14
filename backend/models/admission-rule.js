var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var admissionRuleSchema = mongoose.Schema({
    description: String,
    testExpression: {type: mongoose.Schema.ObjectId, ref: ('logicalExpressionModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('admissionRule', admissionRuleSchema);