var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var logicalSchema = mongoose.Schema({
    course: {type: mongoose.Schema.ObjectId, ref: ('courseCodeModel')},
    minMark: Number, 
    // link: {type: mongoose.Schema.ObjectId, ref: ('logicalExpressionModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('logicalExpression', logicalSchema);