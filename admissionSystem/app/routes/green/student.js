import Ember from 'ember';

export default Ember.Route.extend({
    
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
     MST01IsPermitted: Ember.computed(function(){ //edit student stuff
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf('MST01') >= 0);
    }
    }),
//   model: function () {
//     return this.store.find('student');
//   }
});
