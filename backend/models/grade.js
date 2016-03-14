var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var gradeSchema = mongoose.Schema({
    mark: String,
    section: String,
    course: {type: mongoose.Schema.ObjectId, ref: ('courseCodeModel')},
    student: {type: mongoose.Schema.ObjectId, ref: ('studentModel')},
    record: {type:mongoose.Schema.ObjectId, ref: ('programRecordModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('grade', gradeSchema);