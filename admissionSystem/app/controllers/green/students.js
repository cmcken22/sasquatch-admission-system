import Ember from 'ember';

export default Ember.Controller.extend({
     
    MST01IsPermitted: Ember.computed(function(){ //edit student stuff
        // alert("yo man"); 
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf('MST01') >= 0);
        }
    }),
    
    sortedStudents: function(){
      var model = this.get('model.students').sortBy('firstName');
      return model;
    }.property('model'),

});
//
