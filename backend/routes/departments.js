var departmentModel = require('../models/department');

exports.get = function (request, response) {
    console.log('app.get(/departments)');
    departmentModel.find(function (error, department) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({department: department});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/departments/:department_id)');
    departmentModel.findById(request.params.department_id, function (error, department) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({department: department});
        }
    });
};


exports.put = function (request, response) {
    console.log('app.put(/departments/:department_id))');
    // use our Posts model to find the post we want
    departmentModel.findById(request.params.department_id, function (error, department) {
        if (error) {
            response.send({error: error});
        }
        else {
            department.name = request.body.department.name;
            department.faculty = request.body.department.faculty;
            
            department.save(function (error) {
                console.log('saving to database: ' + department.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({department: department});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/departments)');
    var department = new departmentModel({
        name: request.body.department.name,
        faculty: request.body.department.faculty
    });
    department.save(function (error) {
        console.log('saving to database: ' + department.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({department: department});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/departments/:department_id)');
    departmentModel.findById(request.params.department_id, function (error, department) {
        var deleted = department;
        departmentModel.remove({_id: request.params.department_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({department: deleted});
            });
    });
};