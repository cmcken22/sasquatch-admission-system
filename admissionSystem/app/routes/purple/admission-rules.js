import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    model() {
      return Ember.RSVP.hash({
        rule: this.store.findAll('admission-rule'),
        testExpression: this.store.findAll('logical-expression')
      });
    },
});
