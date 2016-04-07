import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr(),
    lastName: DS.attr(),
    studentNum: DS.attr(),
    DOB: DS.attr(),
    city: DS.belongsTo('city',{async:true}),
    gender: DS.belongsTo('gender',{ async: true }),
    residency: DS.belongsTo('residency',{ async: true }),
    load: DS.belongsTo('load',{ async: true }),
    level: DS.belongsTo('program-record', {async:true}),
    grades: DS.hasMany('grade', { async: true }),
    itrs: DS.hasMany('itr', { async: true })
});
