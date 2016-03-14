var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var distributionSchema = mongoose.Schema({
    date: String,
    comment: {type: mongoose.Schema.ObjectId, ref: ('commentModel')},
    student: {type: mongoose.Schema.ObjectId, ref: ('studentModel')},
    
}, {
    versionKey: false // to disable the "__v" attribute
});
module.exports = mongoose.model('distributionResult', distributionSchema);