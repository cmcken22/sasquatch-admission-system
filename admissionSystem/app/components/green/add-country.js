import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addCountry: function(){
            var myStore = this.get('store');
            var newCountry = myStore.createRecord('country', {
              name: this.get('country'),
            });
            newCountry.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
