import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteAdmissionRule: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Admission Rule! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('admission-rule',id).then(function(code) {
            code.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('admission-rules');
      }
    }
  }
});
