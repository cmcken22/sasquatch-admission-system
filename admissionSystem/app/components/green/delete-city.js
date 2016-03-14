import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {
    deleteCity: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING City! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('city',id).then(function(city) {
           city.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('city');
      }
    }
  }
});

