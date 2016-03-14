import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteProgramAdmin: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING PROGRAM ADMINISTRATION! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('programAdmin',id).then(function(admin) {
            admin.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('program-admins');
      }
    }
  }
});
