import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addCourseCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('course-code', {
              code: this.get('code'),
              number: this.get('number'),
              name: this.get('name'),
              unit: this.get('unit'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
