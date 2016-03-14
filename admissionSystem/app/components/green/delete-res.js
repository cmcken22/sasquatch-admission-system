import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteResidency: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING RESIDENCY! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('residency',id).then(function(residency) {
            residency.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('residencies');
      }
    }
  }
});
