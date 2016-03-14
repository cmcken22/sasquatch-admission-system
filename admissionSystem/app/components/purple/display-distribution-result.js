import Ember from 'ember';

export default Ember.Component.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    student: '100',
    
    actions: {
    
        setStudent(student){
          this.set('student', student);
        }
        
    }
});
