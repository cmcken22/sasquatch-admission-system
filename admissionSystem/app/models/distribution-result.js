import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr(),
    student: DS.belongsTo('student',{ async: true }),
    comment: DS.belongsTo('comment-code',{async:true}),
    failReason: DS.attr(),
});