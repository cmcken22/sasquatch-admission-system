var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var programAdminSchema = mongoose.Schema({
    name: String,
    position: String,
    department: {type: mongoose.Schema.ObjectId, ref: ('departmentModel')},
}, {
    versionKey: false // to disable the "__v" attribute
});

module.exports = mongoose.model('programadministration', programAdminSchema);