import Ember from 'ember';

export function sortAlphabetically(model) {
  var s = Ember.computed.sort(model, ['firstName:desc']);
//   confirm(s);
  return s;
}

export default Ember.Helper.helper(sortAlphabetically);
