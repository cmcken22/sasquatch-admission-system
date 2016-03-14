var facultyModel = require('../models/faculty');

exports.get = function (request, response) {
    console.log('app.get(/faculties)');
    facultyModel.find(function (error, faculty) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({faculty: faculty});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/faculties/:faculty_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    facultyModel.findById(request.params.faculty_id, function (error, faculty) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({faculty: faculty});
        }
    });
};



exports.put = function (request, response) {
    console.log('app.put(/faculties/:faculty_id)');
    // use our Posts model to find the post we want
    facultyModel.findById(request.params.faculty_id, function (error, faculty) {
        if (error) {
            response.send({error: error});
        }
        else {
            faculty.name = request.body.faculty.name;
          
            faculty.save(function (error) {
                console.log('saving to database: ' + faculty.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({faculty: faculty});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/faculties)');
    var faculty = new facultyModel({
        name: request.body.faculty.name,
    });
    faculty.save(function (error) {
        console.log('saving to database: ' + faculty.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({faculty: faculty});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/faculties/:faculty_id)');
    facultyModel.findById(request.params.faculty_id, function (error, faculty) {
        var deleted = faculty;
        facultyModel.remove({_id: request.params.faculty_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({faculty: deleted});
            });
    });
};