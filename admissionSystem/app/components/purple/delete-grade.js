import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {

    deleteGrade: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING grade! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('grade',id).then(function(grade) {
           grade.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('grade');
      }
    }
  }
});

