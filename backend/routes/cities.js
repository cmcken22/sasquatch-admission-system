var cityModel = require('../models/city');

exports.get = function (request, response) {
    console.log('app.get(/cities)');
    cityModel.find(function (error, city) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({city: city});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/cities/:city_id)');
    cityModel.findById(request.params.city_id, function (error, city) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({city: city});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/cities/:city_id)');
    // use our Posts model to find the post we want
    cityModel.findById(request.params.city_id, function (error, city) {
        if (error) {
            response.send({error: error});
        }
        else {
            city.name = request.body.city.name;
            city.province = request.body.city.province;
            
            city.save(function (error) {
                console.log('saving to database: ' + city.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({city: city});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/cities)');
    var city = new cityModel({
        name: request.body.city.name,
        province: request.body.city.province
    });
    city.save(function (error) {
        console.log('saving to database: ' + city.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({city: city});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/cities/:city_id)');
    cityModel.findById(request.params.city_id, function (error, city) {
        var deleted = city;
        cityModel.remove({_id: request.params.city_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({city: deleted});
            });
    });
};