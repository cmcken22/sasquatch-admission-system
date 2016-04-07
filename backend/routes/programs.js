var programModel = require('../models/program');

exports.get = function (request, response) {
    console.log('app.get(/program)');
    programModel.find(function (error, academicprogramcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({academicprogramcode: academicprogramcode});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/program/:program_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    programModel.findById(request.params.academicprogramcode_id, function (error, academicprogramcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({academicprogramcode: academicprogramcode});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/programs/:program_id)');
    // use our Posts model to find the post we want
    programModel.findById(request.params.academicprogramcode_id, function (error, academicprogramcode) {
        if (error) {
            response.send({error: error});
        }
        else {
            academicprogramcode.name = request.body.academicprogramcode.name;
            academicprogramcode.code = request.body.academicprogramcode.code;
            academicprogramcode.subCode = request.body.academicprogramcode.subCode;
            academicprogramcode.acceptionCode = request.body.academicprogramcode.acceptionCode;
            academicprogramcode.rules = request.body.academicprogramcode.rules;
            academicprogramcode.minAverage = request.body.academicprogramcode.minAverage;
            academicprogramcode.save(function (error) {
                console.log('saving to database: ' + academicprogramcode.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({academicprogramcode: academicprogramcode});
                }
            });
        }
    });
}


exports.post = function (request, response) {
    var academicprogramcode = new programModel({
        name: request.body.academicprogramcode.name,
        code: request.body.academicprogramcode.code,
        subCode: request.body.academicprogramcode.subCode,
    });
    academicprogramcode.save(function (error) {
        console.log('saving to database: ' + academicprogramcode.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({academicprogramcode: academicprogramcode});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/programs/:program)');
    programModel.findById(request.params.academicprogramcode_id, function (error, academicprogramcode) {
        var deleted = academicprogramcode;
        programModel.remove({_id: request.params.academicprogramcode_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({academicprogramcode: deleted});
            });
    });
};