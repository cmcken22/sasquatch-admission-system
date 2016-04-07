var logicalModel = require('../models/logical-expression'); 

exports.get = function (request, response) {
    console.log('app.get(/logicalExpressions)');
    logicalModel.find(function (error, logicalExpression) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({logicalExpression: logicalExpression});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/logicalExpressions/:logicalExpression_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    logicalModel.findById(request.params.logicalExpression_id, function (error, logicalExpression) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({logicalExpression: logicalExpression});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/programs/:program_id)');
    // use our Posts model to find the post we want
    logicalModel.findById(request.params.logicalExpression_id, function (error, logicalExpression) {
        if (error) {
            response.send({error: error});
        }
        else {
            logicalExpression.course = request.body.logicalExpression.course,
            logicalExpression.minMark = request.body.logicalExpression.minMark,

            logicalExpression.save(function (error) {
                console.log('saving to database: ' + logicalExpression.minMark);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({logicalExpression: logicalExpression});
                }
            });
        }
    });
}


exports.post = function (request, response) {
    console.log('app.post(/logicalExpressions)');
    var logicalExpression = new logicalModel({
        course: request.body.logicalExpression.course,
        minMark: request.body.logicalExpression.minMark,
    });
    logicalExpression.save(function (error) {
        console.log('saving to database: ' + logicalExpression.minMark);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({logicalExpression: logicalExpression});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/logicalExpressions/:logicalExpression_id)');
    logicalModel.findById(request.params.logicalExpression_id, function (error, term) {
        var deleted = term;
        logicalModel.remove({_id: request.params.logicalExpression_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({term: deleted});
            });
    });
};