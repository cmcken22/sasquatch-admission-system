import DS from 'ember-data';

export default DS.Model.extend({
    programStatus: DS.attr(),
    level: DS.attr(),
    comment: DS.attr(),
    degree: DS.belongsTo('degree-code',{ async: true }),
    term: DS.belongsTo('term-code',{async:true})
});
