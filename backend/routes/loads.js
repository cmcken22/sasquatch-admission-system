var academicLoadModel = require('../models/load');

exports.get = function (request, response) {
    console.log('app.get(/loads)');
    academicLoadModel.find(function (error, load) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({load: load});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/loads/:load_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    academicLoadModel.findById(request.params.load_id, function (error, load) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({load: load});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/loads/:load_id)');
    // use our Posts model to find the post we want
    academicLoadModel.findById(request.params.load_id, function (error, academicLoad) {
        if (error) {
            response.send({error: error});
        }
        else {
            academicLoad.load = request.body.load.load;
          
            academicLoad.save(function (error) {
                console.log('saving to database: ' + academicLoad.load);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({load: academicLoad});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/loads)');
    var load = new academicLoadModel({
        load: request.body.load.load,
    });
    load.save(function (error) {
        console.log('saving to database: ' + load.load);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({load: load});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/load/:load_id)');
    academicLoadModel.findById(request.params.load_id, function (error, load) {
        var deleted = load;
        academicLoadModel.remove({_id: request.params.load_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({load: deleted});
            });
    });
};