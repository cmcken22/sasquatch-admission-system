import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addCommentCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('comment-code', {
              code: this.get('code'),
              progAction: this.get('progAction'),
              description: this.get('description'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});