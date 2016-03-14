var gradeModel = require('../models/grade');

exports.get = function (request, response) {
    console.log('app.get(/grades)');
    gradeModel.find(function (error, grade) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({grade: grade});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/grades/:grade_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    gradeModel.findById(request.params.grade_id, function (error, grade) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({grade: grade});
        }
    });
};
exports.getMyGrades = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/MYgrades)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    
    
    // gradeModel.find({"student": request.params.student_id}), function (error, grades) {
    //     if (error) {
    //         response.send({error: error});
    //     }
    //     else {
    //         response.json({student: grades});
    //     }
    // };
};


exports.post = function (request, response) {
    console.log('app.post/grades/:grade_id)');
    var grade = new gradeModel({
        course: request.body.grade.course,
        student: request.body.grade.student,
        record: request.body.grade.record,
        mark: request.body.grade.mark,
        section: request.body.grade.section    
        
    });
    grade.save(function (error) {
        console.log('saving to database: ' + grade);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({grade: grade});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/grades/:grade_id)');
    gradeModel.findById(request.params.grade_id, function (error, grade) {
        var deleted = grade;
        gradeModel.remove({_id: request.params.grade_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({grade: deleted});
            });
    });
};