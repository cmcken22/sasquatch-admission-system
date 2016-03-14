

var programAdminModel = require('../models/program-admin');

exports.get = function (request, response) {
    console.log('app.get(/program-admin)');
    programAdminModel.find(function (error, programadministration) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programAdmin: programadministration});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/program-admin/:program-admin_id)');
    programAdminModel.findById(request.params.programadministration_id, function (error, programadministration) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programadministration: programadministration});
        }
    });
};

exports.post = function (request, response) {
    console.log('app.post(/program-admin)');
    var programadministration = new programAdminModel({
        name: request.body.programAdmin.name,
        department: request.body.programAdmin.department,
        position: request.body.programAdmin.position
        
    });
    programadministration.save(function (error) {
        console.log('saving to database: ' + programadministration.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({programadministration: programadministration});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/program-admin/:program-admin_id)');
    programAdminModel.findById(request.params.programAdmin_id, function (error, programadministration) {
        var deleted = programadministration;
        programAdminModel.remove({_id: request.params.programAdmin_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({programadministration: deleted});
            });
    });
};