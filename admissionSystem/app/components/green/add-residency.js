import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addResidency: function(){
            var myStore = this.get('store');
            var newGender = myStore.createRecord('residency', {
              residency: this.get('residency'),
            });
            newGender.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});