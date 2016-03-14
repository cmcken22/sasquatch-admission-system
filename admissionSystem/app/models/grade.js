import DS from 'ember-data';

export default DS.Model.extend({
    record: DS.belongsTo('program-record',{ async: true }),
    student: DS.belongsTo('student',{ async: true }),
    course: DS.belongsTo('course-code',{async: true}),
    mark: DS.attr(),
    section: DS.attr()
});
