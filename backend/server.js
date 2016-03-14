var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://sasquatch-admission-system-cmcken22.c9users.io:8080');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://localhost/sas');

//=============================AUTHENTICATE===================================//

var auth = require('./routes/authenticate');
app.get('/authenticate', function (request, response) {
    console.log('app.get(/authenticate)');
    console.log(request.firstName);
});

app.post('/authenticate', function (request, response) {
    console.log('app.post(/authenticate)');
    console.log(request.firstName);
});

//=============================STUDENTS ROUTE=================================//

var student = require('./routes/students');
app.get('/students', student.get);
app.get('/students/:student_id', student.getID);

app.post('/students', student.post);
app.put('/students/:student_id', student.put);
app.delete('/students/:student_id', student.delete);

//===============================LOGIN ROUTE==================================//

var studentModel = require('./models/student');
app.post('/login', function (request, response) {
    
    var check = new studentModel({
        firstName: request.body.student.firstName,
        studentNum: request.body.student.studentNum
    });
    
    console.log(check.firstName + "    " + check.studentNum);
    
    // login.save(function (error) {
    //     console.log('saving to database: ' + student.firstName + " " + student.lastName + " " + student.studentNum + " " + student.DOB);
    //     if (error) {
    //         response.send({error: error});
    //     }
    //     else {
    //         response.status(201).json({student: student});
    //     }
    // });
});

//=============================COUNTRIES ROUTE================================//

var country = require('./routes/countries');
app.get('/countries', country.get);
app.get('/countries/:country_id', country.getID);
app.put('/countries/:country_id', country.put);
app.post('/countries', country.post);
app.delete('/countries/:country_id', country.delete);

//=============================PROVINCES ROUTE================================//

var province = require('./routes/provinces');
app.get('/provinces', province.get);
app.get('/provinces/:province_id', province.getID);
app.put('/provinces/:province_id', province.put);
app.post('/provinces', province.post);
app.delete('/provinces/:province_id', province.delete);

//==============================CITIES ROUTE==================================//

var city = require('./routes/cities');
app.get('/cities', city.get);
app.get('/cities/:city_id', city.getID);
app.put('/cities/:city_id', city.put);
app.post('/cities', city.post);
app.delete('/cities/:city_id', city.delete);

//==============================GENDER ROUTE==================================//

var gender = require('./routes/gender');
app.get('/genders', gender.get);
app.get('/genders/:gender_id', gender.getID);
app.put('/genders/:gender_id', gender.put);
app.post('/genders', gender.post);
app.delete('/genders/:gender_id', gender.delete);

//=========================ACADEMICLOAD ROUTE=================================//

var load = require('./routes/loads');
app.get('/loads', load.get);
app.get('/loads/:load_id', load.getID);
app.put('/loads/:load_id', load.put);
app.post('/loads', load.post);
app.delete('/loads/:load_id', load.delete);

//===============================RESIDENCY ROUTE==============================//

var res = require('./routes/residencies');
app.get('/residencies', res.get);
app.get('/residencies/:residency_id', res.getID);
app.put('/residencies/:residency_id', res.put);
app.post('/residencies', res.post);
app.delete('/residencies/:residency_id', res.delete);

//==========================Program Codes Route===============================//

var program = require('./routes/programs');
app.get('/academicprogramcodes', program.get);
app.get('/academicprogramcodes/:academicprogramcode_id', program.getID);
app.put('/academicprogramcodes/:academicprogramcode_id', program.put);
app.post('/academicprogramcodes', program.post);
app.delete('/academicprogramcodes/:academicprogramcode_id', program.delete);

//===============================ITR Route====================================//

var itr = require('./routes/itrs');
app.get('/itrs', itr.get);
app.get('/itrs/:itr_id', itr.getID);
app.post('/itrs', itr.post);
app.delete('/itrs/:itr_id', itr.delete);

//===========================Term Code Route==================================//

var term = require('./routes/term-codes');
app.get('/termCodes', term.get);
app.put('/termCodes/:termCode_id', term.put);
app.get('/termCodes/:termCode_id', term.getID);
app.post('/termCodes', term.post);
app.delete('/termCodes/:termCode_id', term.delete);

//===========================Degree Code Route================================//

var degree = require('./routes/degree-codes');
app.get('/degreeCodes', degree.get);
app.put('/degreeCodes/:degreeCode_id', degree.put);
app.get('/degreeCodes/:degreeCode_id', degree.getID);
app.post('/degreeCodes', degree.post);
app.delete('/degreeCodes/:degreeCode_id', degree.delete);

//===========================Course Code Route================================//

var course = require('./routes/course-codes');
app.get('/courseCodes', course.get);
app.put('/courseCodes/:courseCode_id', course.put);
app.get('/courseCodes/:courseCode_id', course.getID);
app.post('/courseCodes', course.post);
app.delete('/courseCodes/:courseCode_id', course.delete);

//=============================FACULTIES ROUTE================================//

var faculty = require('./routes/faculties');
app.get('/faculties', faculty.get);
app.get('/faculties/:faculty_id', faculty.getID);
app.put('/faculties/:faculty_id', faculty.put);
app.post('/faculties', faculty.post);
app.delete('/faculties/:faculty_id', faculty.delete);


//==========================DEPARTMENTS ROUTE=================================//

var department = require('./routes/departments');
app.get('/departments', department.get);
app.get('/departments/:department_id', department.getID);
app.put('/departments/:department_id', department.put);
app.post('/departments', department.post);
app.delete('/departments/:department_id', department.delete);


//=========================PROGRAM ADMINS ROUTE===============================//

var department = require('./routes/program-admins');
app.get('/programAdmins', department.get);
app.get('/programAdmins/:programAdmin_id', department.getID);
app.post('/programAdmins', department.post);
app.delete('/programAdmins/:programAdmin_id', department.delete);

//=============================COMMENTS ROUTE=================================//

var comment = require('./routes/comments');
app.get('/commentCodes', comment.get);
app.get('/commentCodes/:commentCode_id', comment.getID);
app.put('/commentCodes/:commentCode_id', comment.put);
app.post('/commentCodes', comment.post);
app.delete('/commentCodes/:commentCode_id', comment.delete);

//==============================GRADES ROUTE==================================//

var grade = require('./routes/grades');
app.get('/grades', grade.get);
app.get('/grades/:grade_id', grade.getID);
app.get('/students/:student_id', grade.getMyGrades);
app.post('/grades', grade.post);
app.delete('/grades/:grade_id', grade.delete);

//===========================Program record Route=============================//

var programRecord = require('./routes/program-records');
app.get('/programRecords', programRecord.get);
app.get('/programRecords/:programRecord_id', programRecord.getID);
app.post('/programRecords', programRecord.post);
app.delete('/programRecords/:programRecord_id', programRecord.delete);

//========================Distribution Result Route===========================//

var distributionResult = require('./routes/distribution-results');
app.get('/distributionResults', distributionResult.get);
app.get('/distributionResults/:distributionResult_id', distributionResult.getID);
app.post('/distributionResults', distributionResult.post);
app.delete('/distributionResults/:distributionResult_id', distributionResult.delete);

//========================Logical Expression Route============================//

var logicalExpression = require('./routes/logical-expressions');
app.get('/logicalExpressions', logicalExpression.get);
app.get('/logicalExpressions/:logicalExpression_id', logicalExpression.getID);
app.post('/logicalExpressions', logicalExpression.post);
app.delete('/logicalExpressions/:logicalExpression_id', logicalExpression.delete);

//==========================Admission Rule Route==============================//

var admissionRule = require('./routes/admission-rules');
app.get('/admissionRules', admissionRule.get);
app.get('/admissionRules/:admissionRule_id', admissionRule.getID);
app.post('/admissionRules', admissionRule.post);
app.delete('/admissionRules/:admissionRule_id', admissionRule.delete);

//==============================LOGIN ROUTE===================================//

var logins = require('./routes/logins');
var roots = require('./routes/roots');
app.use('/logins', logins);
app.use('/roots', roots);

//<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>><<>><<>><<>><<>//

app.listen('8082');