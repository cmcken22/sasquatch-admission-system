import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteProgramRecord: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING PROGRAM RECORD! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('programRecord',id).then(function(record) {
            record.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('program-records');
      }
    }
  }
});
