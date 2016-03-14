import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteCommentCode: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Comment Code! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('comment-code',id).then(function(code) {
            code.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('comment-codes');
      }
    }
  }
});
