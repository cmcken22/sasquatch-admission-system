import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),

    model() {
      return Ember.RSVP.hash({
        grade: this.store.findAll('grade'),
        courseCode: this.store.findAll('course-code'),
        student: this.store.findAll('student'),
        programRecord: this.store.findAll('program-record'),
        termCode: this.store.findAll('term-code'),
        degreeCode: this.store.findAll('degree-code')
      });
    },
});
