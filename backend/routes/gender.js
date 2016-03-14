var genderModel = require('../models/gender');

exports.get = function (request, response) {
    console.log('app.get(/genders)');
    genderModel.find(function (error, gender) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({gender: gender});
        }
    });
};


exports.getID =  function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/genders/:gender_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    genderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({gender: gender});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/genders/:gender_id)');
    // use our Posts model to find the post we want
    genderModel.findById(request.params.gender_id, function (error, gender) {
        if (error) {
            response.send({error: error});
        }
        else {
            gender.sex = request.body.gender.sex;
          
            gender.save(function (error) {
                console.log('saving to database: ' + gender.sex);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({gender: gender});
                }
            });
        }
    });
}
exports.post = function (request, response) {
    console.log('app.post(/genders)');
    var gender = new genderModel({
        sex: request.body.gender.sex,
    });
    gender.save(function (error) {
        console.log('saving to database: ' + gender.sex);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({gender: gender});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/genders/:gender_id)');
    genderModel.findById(request.params.gender_id, function (error, gender) {
        var deleted = gender;
        genderModel.remove({_id: request.params.gender_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({gender: deleted});
            });
    });
};