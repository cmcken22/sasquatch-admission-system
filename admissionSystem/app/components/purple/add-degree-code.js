import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addDegCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('degree-code', {
              name: this.get('name'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});