var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var departmentSchema = mongoose.Schema({
    name: String,
    faculty: {type: mongoose.Schema.ObjectId, ref: ('facultyModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('department', departmentSchema);