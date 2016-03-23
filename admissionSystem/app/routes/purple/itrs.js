import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    student: '100',
    
    model() {
      return Ember.RSVP.hash({
        academicprogramcode: this.store.findAll('academicprogramcode'),
        student: this.store.findAll('student'),
        itr: this.store.findAll('itr')
      });
    },
});
