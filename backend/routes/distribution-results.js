var distributionModel = require('../models/distribution-result');

exports.get = function (request, response) {//gets json for all distributionResults
    console.log('app.get(/distributionResults)');
    distributionModel.find(function (error, distributionResult) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({distributionResult: distributionResult});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified distributionResult(by ID)
    console.log('app.get(/distributionResults/:distributionResult_id)');
    // console.log('request.params.distributionResultNum: ' + request.params.distributionResult_id);
    distributionModel.findById(request.params.distributionResult_id, function (error, distributionResult) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({distributionResult: distributionResult});
        }
    });
};

exports.post =  function (request, response) {
    console.log('app.post(/distributionResults)');
    
    // !!!!Check Bugs HERE
    var distributionResult = new distributionModel({
        date: request.body.distributionResult.date,
        comment: request.body.distributionResult.comment,
        student: request.body.distributionResult.student,
        failReason: request.body.distributionResult.failReason,
    });
    
    distributionResult.save(function (error) {
        console.log('saving to database: ' + distributionResult.id + distributionResult.date);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({distributionResult: distributionResult});
        }
    });
};

// exports.put = function (request, response) {
//     console.log('app.put(/distributionResults/:distributionResult_id)');
//     // use our Posts model to find the post we want
//     distributionModel.findById(request.params.distributionResult_id, function (error, distributionResult) {
//         if (error) {
//             response.send({error: error});
//         }
//         else {
//             // update the post info
//             distributionResult.firstName = request.body.distributionResult.firstName;
//             distributionResult.lastName = request.body.distributionResult.lastName;
//             distributionResult.distributionResultNum = request.body.distributionResult.distributionResultNum;
//             distributionResult.DOB = request.body.distributionResult.DOB;
//             distributionResult.gender = request.body.distributionResult.gender;
//             distributionResult.residency = request.body.distributionResult.residency;
//             distributionResult.load = request.body.distributionResult.load;
//             distributionResult.country = request.body.distributionResult.country;
//             distributionResult.province = request.body.distributionResult.province;
//             distributionResult.city = request.body.distributionResult.city;
//             //ITRList: [];
           
//             // save the post
            
//             // !!!!Check Bugs HERE
//             // var itrPrograms = request.body.itrprograms;
            
//             // itrPrograms.forEach(function(itrProgram){
//             //         var progToAdd = new itr_programModel({
//             //             order: itrProgram.order,
//             //             elgibility: itrProgram.eligibility,
//             //             program: itrProgram.program
//             //         });
//             //         progToAdd.save(function (error, result) {
//             //             console.log('Program number' + progToAdd.order);
//             //             if (error) {
//             //                 console.log('Error saving');
//             //             }
//             //             else {
//             //                 console.log('Save succesful');
//             //                 distributionResult.ITRList.push(result._id);
//             //             }
//             //         });
//             //     });
            
//             distributionResult.save(function (error) {
//                 console.log('saving to database: ' + distributionResult.firstName + " " + distributionResult.lastName + " " + distributionResult.distributionResultNum + " " + distributionResult.DOB);                if (error) {
//                     response.send({error: error});
//                 }
//                 else {
//                     response.status(201).json({distributionResult: distributionResult});
//                 }
//             });
//         }
//     });
// };

exports.delete = function (request, response) {
    console.log('app.delete(/distributionResults/:distributionResult_id)');
    distributionModel.findById(request.params.distributionResult_id, function (error, distributionResult) {
        var deleted = distributionResult;
        distributionModel.remove({_id: request.params.distributionResult_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({distributionResult: deleted});
            });
    });
};
