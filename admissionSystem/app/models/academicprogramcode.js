import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  code: DS.attr(),
  subCode: DS.attr(),
  acceptionCode: DS.belongsTo('comment-code',{ async: true }),//this is the comment code given upon successful distribution
  rules: DS.hasMany('admission-rule',{ async: true }),
  minAverage: DS.attr('number'),
});
