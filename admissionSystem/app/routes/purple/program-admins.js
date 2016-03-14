import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    model() {
      return Ember.RSVP.hash({
        programAdmin: this.store.findAll('program-admin'),
        department: this.store.findAll('department')
      })
    },
});