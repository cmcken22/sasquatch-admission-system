import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addFaculty: function(){
            var myStore = this.get('store');
            var newFaculty = myStore.createRecord('faculty', {
              name: this.get('name')
            });
            newFaculty.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
