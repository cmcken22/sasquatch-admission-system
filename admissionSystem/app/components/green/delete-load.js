import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteLoad: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING LOAD! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('load',id).then(function(load) {
            load.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('loads');
      }
    }
  }
});
