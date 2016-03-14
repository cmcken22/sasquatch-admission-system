var courseCodeModel = require('../models/course-code');

exports.get = function (request, response) {
    console.log('app.get(/courseCodes)');
    courseCodeModel.find(function (error, courseCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({courseCode: courseCode});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/courseCodes/:courseCode_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    courseCodeModel.findById(request.params.courseCode_id, function (error, courseCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({courseCode: courseCode});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/courseCodes/:courseCode_id)');
    // use our Posts model to find the post we want
    courseCodeModel.findById(request.params.courseCode_id, function (error, courseCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            courseCode.code = request.body.courseCode.code;
            courseCode.number = request.body.courseCode.number;
            courseCode.name = request.body.courseCode.name;
            courseCode.unit = request.body.courseCode.unit;
            courseCode.save(function (error) {
                console.log('saving to database: ' + courseCode.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({courseCode: courseCode});
                }
            });
        }
    });
}


exports.post = function (request, response) {
    console.log('app.post(/courseCodes)');
    var courseCode = new courseCodeModel({
        code: request.body.courseCode.code,
        number: request.body.courseCode.number,
        name: request.body.courseCode.name,
        unit: request.body.courseCode.unit,
    });
    courseCode.save(function (error) {
        console.log('saving to database: ' + courseCode.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({courseCode: courseCode});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/courseCodes/:courseCode_id)');
    courseCodeModel.findById(request.params.courseCode_id, function (error, courseCode) {
        var deleted = courseCode;
        courseCodeModel.remove({_id: request.params.courseCode_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({courseCode: deleted});
            });
    });
};