import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {
    deleteDepartment: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Department! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('department',id).then(function(department) {
            department.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('departments');
      }
    }
  }
});
