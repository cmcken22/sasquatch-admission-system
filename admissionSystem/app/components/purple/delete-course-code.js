import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteCourseCode: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Course Code! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('course-code',id).then(function(code) {
            code.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('course-codes');
      }
    }
  }
});
