import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteStudent: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING STUDENT! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('student',id).then(function(student) {
          student.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('green.students');
      }
    }
  }
});