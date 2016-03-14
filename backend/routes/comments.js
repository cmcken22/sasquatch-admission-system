var commentCodeModel = require('../models/comment-code'); 

exports.get = function (request, response) {
    console.log('app.get(/commentCodes)');
    commentCodeModel.find(function (error, commentCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({commentCode: commentCode});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/commentCodes/:commentCode_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    commentCodeModel.findById(request.params.commentCode_id, function (error, commentCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({commentCode: commentCode});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/commentCodes/:commentCode_id)');
    // use our Posts model to find the post we want
    commentCodeModel.findById(request.params.commentCode_id, function (error, commentCode) {
        if (error) {
            response.send({error: error});
        }
        else {
            commentCode.code = request.body.commentCode.code;
            commentCode.progAction = request.body.commentCode.progAction;
            commentCode.description = request.body.commentCode.description;
            
            commentCode.save(function (error) {
                console.log('saving to database: ' + commentCode.code);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({commentCode: commentCode});
                }
            });
        }
    });
}


exports.post = function (request, response) {
    console.log('app.post(/commentCodes)');
    var commentCode = new commentCodeModel({
        code: request.body.commentCode.code,
        progAction: request.body.commentCode.progAction,
        description: request.body.commentCode.description,
    });
    commentCode.save(function (error) {
        console.log('saving to database: ' + commentCode.code);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({commentCode: commentCode});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/commentCodes/:commentCode_id)');
    commentCodeModel.findById(request.params.commentCode_id, function (error, commentCode) {
        var deleted = commentCode;
        commentCodeModel.remove({_id: request.params.commentCode_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({commentCode: deleted});
            });
    });
};