import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addGender: function(){
            var myStore = this.get('store');
            var newGender = myStore.createRecord('gender', {
              sex: this.get('sex'),
            });
            newGender.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
