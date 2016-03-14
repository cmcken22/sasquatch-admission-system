import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteFaculty: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Facutly ! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('faculty',id).then(function(code) {
            code.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('faculties');
      }
    }
  }
});
