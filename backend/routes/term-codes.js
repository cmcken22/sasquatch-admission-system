var termCodeModel = require('../models/term-code');

exports.get = function (request, response) {
    console.log('app.get(/termCodes)');
    termCodeModel.find(function (error, termCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({termCode: termCode});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/termCodes/:termCode_id)');
    
    termCodeModel.findById(request.params.termCode_id, function (error, termCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({termCode: termCode});
        }
    });
};
exports.put = function (request, response) {
    console.log('app.put(/termCodes/:termCode_id)');
    // use our Posts model to find the post we want
    termCodeModel.findById(request.params.termCode_id, function (error, termCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            termCode.name = request.body.termCode.name;
            termCode.save(function (error) {
                console.log('saving to database: ' + termCode.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({termCode: termCode});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/termCodes)');
    var termCode = new termCodeModel({
        name: request.body.termCode.name,
    });
    termCode.save(function (error) {
        console.log('saving to database: ' + termCode.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({termCode: termCode});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/termCodes/:termCode_id)');
    termCodeModel.findById(request.params.termCode_id, function (error, termCode) {
        var deleted = termCode;
        termCodeModel.remove({_id: request.params.termCode_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({termCode: deleted});
            });
    });
};