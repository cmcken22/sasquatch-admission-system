var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var programRecordSchema = mongoose.Schema({
    level: Number,
    programStatus: String,
    comment: String,
    // Proper name for model?
    degree: {type: mongoose.Schema.ObjectId, ref: ('degreeCodeModel')},
    term: {type: mongoose.Schema.ObjectId, ref: ('termCodeModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('programRecord', programRecordSchema);
// INFO FROM ROUTE
//         level: request.body.programRecord.level,
//         programStatus: request.body.programRecord.programStatus,
//         comment: request.body.programRecord.comment,
//         degree: request.body.programRecord.degree,
//         term: request.body.programRecord.term