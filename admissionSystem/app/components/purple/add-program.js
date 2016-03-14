import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addProgram: function(){
            var myStore = this.get('store');
            var newProg = myStore.createRecord('academicprogramcode', {
              name: this.get('programName'),
              code: this.get('code'),
              subCode: this.get('subCode'),
            });
            newProg.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
