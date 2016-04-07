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
    console.log('app.post(/itrs)');
    var itr = new itrModel({
        academicprogramcode: request.body.itr.academicprogramcode,
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

exports.put = function (request, response) {
    console.log('app.put(/itrs/:itr_id)');
    // use our Posts model to find the post we want
    itrModel.findById(request.params.itr_id, function (error, itr) {
        if (error) {
            response.send({error: error});
        }
        else {
            
            console.log("**********" + request.body.itr.order);
            console.log("**********" + request.body.itr.eligibility);
            console.log("**********" + request.body.itr.academicprogramcode);
            
            itr.order = request.body.itr.order;
            itr.eligibility = request.body.itr.eligibility;
            itr.academicprogramcode = request.body.itr.academicprogramcode;
            
            itr.save(function (error) {
                console.log('saving to database: ' + itr.id);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({itr: itr});
                }
            });
            
        }
    });
}

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