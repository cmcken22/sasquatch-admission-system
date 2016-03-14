var degreeCodeModel = require('../models/degree-code');

exports.get = function (request, response) {
    console.log('app.get(/degreeCodes)');
    degreeCodeModel.find(function (error, degreeCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({degreeCode: degreeCode});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/degreeCodes/:degreeCode_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    degreeCodeModel.findById(request.params.degreeCode_id, function (error, degreeCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({degreeCode: degreeCode});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/degreeCodes/:degreeCode_id)');
    // use our Posts model to find the post we want
    degreeCodeModel.findById(request.params.degreeCode_id, function (error, degreeCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            degreeCode.name = request.body.degreeCode.name;
          
            degreeCode.save(function (error) {
                console.log('saving to database: ' + degreeCode.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({degreeCode: degreeCode});
                }
            });
        }
    });
}



exports.post = function (request, response) {
    console.log('app.post(/degreeCodes)');
    var degreeCode = new degreeCodeModel({
        name: request.body.degreeCode.name,
    });
    degreeCode.save(function (error) {
        console.log('saving to database: ' + degreeCode.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({degreeCode});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/degreeCodes/:degreeCode_id)');
    degreeCodeModel.findById(request.params.degreeCode_id, function (degreeCode) {
        var deleted = degreeCode;
        degreeCodeModel.remove({_id: request.params.degreeCode_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({degreeCode: deleted});
            });
    });
};