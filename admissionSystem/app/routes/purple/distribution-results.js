import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    model() {
      return Ember.RSVP.hash({
        distributionResult: this.store.findAll('distribution-result'),
        comment: this.store.findAll('comment-code'),
        student: this.store.findAll('student')
      });
    },
});
