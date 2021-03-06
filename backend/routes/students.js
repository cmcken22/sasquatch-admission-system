var studentModel = require('../models/student');
var gradeModel = require('../models/grade');

exports.get = function (request, response) {//gets json for all students
    console.log('app.get(/students)');
    studentModel.find(function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({student: student});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/students/:student_id)');
    
    // console.log('request.params.studentNum: ' + request.params.student_id);
    var json = {};
    studentModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            json.student = student;
            // gradeModel.find({"student": request.params.student_id}, function (error, marks) {
                
            //     if(marks.length >= 1){
            //         console.log(marks);
            //         json.student.marks = "" + marks;
            //         response.json(json);
            //     }else{
            //         response.json(json);
            //     }
            // });
        };
    });
    
    
    
};

exports.post =  function (request, response) {
    console.log('app.post(/students)');
    
    // !!!!Check Bugs HERE
    var student = new studentModel({
        firstName: request.body.student.firstName,
        lastName: request.body.student.lastName,
        studentNum: request.body.student.studentNum,
        DOB: request.body.student.DOB,
        gender: request.body.student.gender,
        residency: request.body.student.residency,
        load: request.body.student.load,
        city: request.body.student.city
        // ITRList: []
            
    });
    
    // !!!!Check Bugs HERE
    // var itrPrograms = request.body.itrprogram;
    
    // itrPrograms.forEach(function(itrProgram){
    //                 var progToAdd = new itr_programModel({
    //                     order: itrProgram.order,
    //                     elgibility: itrProgram.eligibility,
    //                     program: itrProgram.program
    //                 });
    //                 progToAdd.save(function (error, result) {
    //                     console.log('Program number' + progToAdd.order);
    //                     if (error) {
    //                         console.log('Error saving');
    //                     }
    //                     else {
    //                         console.log('Save succesful');
    //                         student.ITRList.push(result._id);
    //                     }
    //                 });
    //             });
    
    
    student.save(function (error) {
        console.log('saving to database: ' + student.firstName + " " + student.lastName + " " + student.studentNum + " " + student.DOB + " " + student.gender + " " + student.residency);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({student: student});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/students/:student_id)');
    console.log(request.body);
    studentModel.findById(request.params.student_id, function (error, student) {
        if (error) {
            response.send({error: error});
        }
        else {
            // update the post info
            student.firstName = request.body.student.firstName;
            student.lastName = request.body.student.lastName;
            student.studentNum = request.body.student.studentNum;
            student.DOB = request.body.student.DOB;
            student.gender = request.body.student.gender;
            student.residency = request.body.student.residency;
            student.load = request.body.student.load;
            student.country = request.body.student.country;
            student.province = request.body.student.province;
            student.city = request.body.student.city;
            student.grades = request.body.student.grades;
            //ITRList: [];
        
            
            student.save(function (error) {
                console.log('saving to database: ' + student.firstName + " " + student.lastName + " " + student.studentNum + " " + student.DOB);                
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({student: student});
                }
            });
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/students/:student_id)');
    studentModel.findById(request.params.student_id, function (error, student) {
        var deleted = student;
        studentModel.remove({_id: request.params.student_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({student: deleted});
            });
    });
};
