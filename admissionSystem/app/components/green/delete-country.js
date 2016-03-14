import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteCountry: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING COUNTRY! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('country',id).then(function(country) {
            country.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('countries');
      }
    }
  }
});
