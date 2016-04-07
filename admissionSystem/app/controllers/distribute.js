import Ember from 'ember';

export default Ember.Controller.extend({
    sortedStudents: function(){
      var model = this.get('model.student').sortBy('firstName');
      return model;
    }.property('model'), 
});
