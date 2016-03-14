var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    studentNum: String,
    DOB: String,
    city: {type: mongoose.Schema.ObjectId, ref: ('cityModel')},
    gender: {type: mongoose.Schema.ObjectId, ref: ('genderModel')},
    residency: {type: mongoose.Schema.ObjectId, ref: ('residencyModel')},//used to say gendermodel  ? ? 
    load: {type: mongoose.Schema.ObjectId, ref: ('academicLoadModel')},
    marks: [{type: mongoose.Schema.ObjectId, ref: ('gradeModel')}]
    
    /*
    Add when necessary, wasn't sure whether adding earlier would cause problems
    ,
    city: {type: mongoose.Schema.ObjectId, ref: ('city')},
    ITRList: [{type: mongoose.Schema.ObjectId, ref: ('itr_program')}],
    */
}, {
    versionKey: false // to disable the "__v" attribute
});
module.exports = mongoose.model('student', studentSchema);

