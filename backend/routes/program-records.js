

var programRecordModel = require('../models/program-record');

exports.get = function (request, response) {
    console.log('app.get(/program-record)');
    programRecordModel.find(function (error, programRecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programRecord: programRecord});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/program-Record/:program-record_id)');
    programRecordModel.findById(request.params.programRecord_id, function (error, programRecord) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({programRecord: programRecord});
        }
    });
};

exports.post = function (request, response) {
    console.log('app.post(/program-record)');
    var programRecord = new programRecordModel({
        level: request.body.programRecord.level,
        programStatus: request.body.programRecord.programStatus,
        comment: request.body.programRecord.comment,
        degree: request.body.programRecord.degree,
        term: request.body.programRecord.term
        
    });
    programRecord.save(function (error) {
        console.log('saving to database: ' + programRecord.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({programRecord: programRecord});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/program-record/:program-record_id)');
    programRecordModel.findById(request.params.programRecord_id, function (error, programRecord) {
        var deleted = programRecord;
        programRecordModel.remove({_id: request.params.programRecord_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({programRecord: deleted});
            });
    });
};