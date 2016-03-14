var countryModel = require('../models/country');

exports.get = function (request, response) {
    console.log('app.get(/countries)');
    countryModel.find(function (error, country) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({country: country});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/countries/:country_id)');
    // console.log('request.params.studentNum: ' + request.params.student_id);
    countryModel.findById(request.params.country_id, function (error, country) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({country: country});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/countries/:country_id)');
    // use our Posts model to find the post we want
    countryModel.findById(request.params.country_id, function (error, country) {
        if (error) {
            response.send({error: error});
        }
        else {
            country.name = request.body.country.name;
          
            country.save(function (error) {
                console.log('saving to database: ' + country.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({country: country});
                }
            });
        }
    });
}



exports.post =  function (request, response) {
    console.log('app.post(/countries)');
    var country = new countryModel({
        name: request.body.country.name,
    });
    country.save(function (error) {
        console.log('saving to database: ' + country.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({country: country});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/countries/:country_id)');
    countryModel.findById(request.params.country_id, function (error, country) {
        var deleted = country;
        countryModel.remove({_id: request.params.country_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({country: deleted});
            });
    });
};
