var residencyModel = require('../models/residency');

exports.get = function (request, response) {
    console.log('app.get(/residency)');
    residencyModel.find(function (error, residency) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({residency: residency});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/residencies/:residency_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    residencyModel.findById(request.params.residency_id, function (error, residency) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({residency: residency});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/residencies/:residency_id)');
    // use our Posts model to find the post we want
    residencyModel.findById(request.params.residency_id, function (error, res) {
        if (error) {
            response.send({error: error});
        }
        else {
            res.residency = request.body.residency.residency;
          
            res.save(function (error) {
                console.log('saving to database: ' + res.residency);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({residency: res});
                }
            });
        }
    });
}



exports.post = function (request, response) {
    console.log('app.post(/residency)');
    var residency = new residencyModel({
        residency: request.body.residency.residency,
    });
    residency.save(function (error) {
        console.log('saving to database: ' + residency.residency);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({residency: residency});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/residencies/:res)');
    residencyModel.findById(request.params.residency_id, function (error, residency) {
        var deleted = residency;
        residencyModel.remove({_id: request.params.residency_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({residency: deleted});
            });
    });
};
