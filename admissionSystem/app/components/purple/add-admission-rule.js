import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    logicalExpression: '100',
    
    actions:{
        
        setExp(logicalExpressionID){
            this.set('logicalExpression', logicalExpressionID);
        },
        
        addAdmissionRule: function(){
            var myStore = this.get('store');
            var newLogicalExp = myStore.peekRecord('logical-expression', this.get('logicalExpression'));
            var newRule = myStore.createRecord('admission-rule', {
              description: this.get('description'),
              testExpression: newLogicalExp,
            });
            newRule.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
