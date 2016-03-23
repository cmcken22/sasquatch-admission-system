import DS from 'ember-data';

export default DS.Model.extend({
    
    description: DS.attr(),
    
    course: DS.belongsTo('course-code', {async:true}),
    
    minMark: DS.attr('number'),
    
    //testExpression: DS.hasMany('logical-expression',{ async: true })
});
