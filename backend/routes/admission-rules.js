var admissionRuleModel = require('../models/admission-rule');

exports.get = function (request, response) {
    console.log('app.get(/admissionRules)');
    admissionRuleModel.find(function (error, admissionRule) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({admissionRule: admissionRule});
        }
    });
};

exports.getID = function (request, response) {//gets json for specified student(by ID)
    console.log('app.get(/admissionRules/:admissionRule_id)');
    admissionRuleModel.findById(request.params.admissionRule_id, function (error, admissionRule) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({admissionRule: admissionRule});
        }
    });
};

exports.post = function (request, response) {
    console.log('app.post(/admissionRules)');
    var admissionRule = new admissionRuleModel({
        description: request.body.admissionRule.description,
        testExpression: request.body.admissionRule.testExpression
    });
    admissionRule.save(function (error) {
        console.log('saving to database: ' + admissionRule.name);
        if (error) {
            response.send({error: error});
        }
        else {
            response.status(201).json({admissionRule: admissionRule});
        }
    });
};

exports.delete = function (request, response) {
    console.log('app.delete(/admissionRules/:admissionRule_id)');
    admissionRuleModel.findById(request.params.admissionRule_id, function (error, admissionRule) {
        var deleted = admissionRule;
        admissionRuleModel.remove({_id: request.params.admissionRule_id},
            function (error) {
                if (error) response.send(error);
                response.status(200).json({admissionRule: deleted});
            });
    });
};