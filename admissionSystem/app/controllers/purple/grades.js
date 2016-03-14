import Ember from 'ember';

export default Ember.Controller.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    studentModel: Ember.computed(function(){
      return this.get('store').findAll('student');
    }),
});
