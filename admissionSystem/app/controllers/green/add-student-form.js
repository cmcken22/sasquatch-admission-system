import Ember from 'ember';

export default Ember.Controller.extend({
    MST01IsPermitted: Ember.computed(function(){ //edit student stuff
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf('MST01') >= 0);
    }
    }),
});
