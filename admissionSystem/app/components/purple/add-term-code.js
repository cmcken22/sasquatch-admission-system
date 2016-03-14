import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addTermCode: function(){
            var myStore = this.get('store');
            
            var newTermCode = myStore.createRecord('term-code', {
              name: this.get('name'),
            });
            
            newTermCode.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
