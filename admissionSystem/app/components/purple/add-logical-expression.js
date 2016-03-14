import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addLogicalExpression: function(){
            var myStore = this.get('store');
            var newExp = myStore.createRecord('logical-expression', {
              booleanExp: this.get('booleanExp'),
              logicalLink: this.get('logicalLink'),
            });
            newExp.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
