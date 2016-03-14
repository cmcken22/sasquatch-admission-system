import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteGender: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING GENDER! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('gender',id).then(function(gender) {
            gender.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('genders');
      }
    }
  }
});
