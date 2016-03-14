import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {

    deleteItr: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING ITR! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('itr',id).then(function(itr) {
           itr.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('itr');
      }
    }
  }
});

