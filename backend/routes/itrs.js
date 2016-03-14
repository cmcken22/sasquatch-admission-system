var itrModel = require('../models/itr');

exports.get = function (request, response) {
    console.log('app.get(/itrs)');
    itrModel.find(function (error, itr) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({itr: itr});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/itrs/:itr_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    itrModel.findById(request.params.itr_id, function (error, itr) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({itr: itr});
        }
    });
};

exports.post = function (request, response) {
    var itr = new itrModel({
        program: request.body.itr.program,
        student: request.body.itr.student,
        order: request.body.itr.order,
        eligibility: request.body.itr.eligibility
        
    });
    itr.save(function (error) {
        console.log('saving to database: ' + itr);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({itr: itr});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/itrs/:itr_id)');
    itrModel.findById(request.params.itr_id, function (error, itr) {
        var deleted = itr;
        itrModel.remove({_id: request.params.itr_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({itr: deleted});
            });
    });
};