var provinceModel = require('../models/province');

exports.get = function (request, response) {
    console.log('app.get(/provinces)');
    provinceModel.find(function (error, province) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({province: province});
        }
    });
};


exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get/provinces/:province_id)');
    provinceModel.findById(request.params.province_id, function (error, province) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({province: province});
        }
    });
};

exports.put = function (request, response) {
    console.log('app.put(/provinces/:province_id)');
    // use our Posts model to find the post we want
    provinceModel.findById(request.params.province_id, function (error, province) {
        if (error) {
            response.send({error: error});
        }
        else {
            province.name = request.body.province.name;
            province.country = request.body.province.country;
            
            province.save(function (error) {
                console.log('saving to database: ' + province.name);
                if (error) {
                    response.send({error: error});
                }
                else {
                    response.status(201).json({province: province});
                }
            });
        }
    });
}

exports.post = function (request, response) {
    console.log('app.post(/provinces)');
    var province = new provinceModel({
        name: request.body.province.name,
        country: request.body.province.country
    });
    province.save(function (error) {
        console.log('saving to database: ' + province.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({province: province});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/provincees/:province_id)');
    provinceModel.findById(request.params.province_id, function (error, province) {
        var deleted = province;
        provinceModel.remove({_id: request.params.province_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({province: deleted});
            });
    });
};