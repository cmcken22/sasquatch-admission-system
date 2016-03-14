import DS from 'ember-data';

export default DS.Model.extend({
    academicprogramcode: DS.belongsTo('academicprogramcode',{ async: true }),
    student: DS.belongsTo('student',{ async: true }),
    order: DS.attr(),
    eligibility: DS.attr()
});
