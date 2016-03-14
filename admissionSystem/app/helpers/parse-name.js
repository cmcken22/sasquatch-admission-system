import Ember from 'ember';

export function parseName(params/*, hash*/) {
  return params;
}
export function getFirstName(n, num) {
    var name = '';
    for(var i=0; i<num; i++){
        name += n[i]; 
    }
  return name;
}
export function getLastName(n, num) {
    var name = '';
    for(var i=num; i<n.length; i++){
        name += n[i]; 
    }
  return name;
}
export default Ember.Helper.helper(parseName);
