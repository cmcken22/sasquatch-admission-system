import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {
    deleteLogicalExpression: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Logical Expression! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('logical-expression',id).then(function(logic) {
            logic.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('logical-expressions');
      }
    }
  }
});
