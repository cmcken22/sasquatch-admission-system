import Ember from 'ember';

export default Ember.Route.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
   model(){
        return Ember.RSVP.hash({
            students: this.store.findAll('student'),
            programRecord: this.store.findAll('program-record'),
            courseCode: this.store.findAll('course-code'),
            termCode: this.store.findAll('term-code'),
            degreeCode: this.store.findAll('degree-code'),
            grades: this.store.findAll('grade')
        });
    }
});

