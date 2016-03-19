import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return Ember.RSVP.hash({
        student: this.store.findAll('student'),
        grade: this.store.findAll('grade'),
        courseCode: this.store.findAll('course-code'),
        
        programRecord: this.store.findAll('program-record'),
        termCode: this.store.findAll('term-code'),
        degreeCode: this.store.findAll('degree-code'),
        
      });
    },
    
    actions:{
    selectThis: function(id){
        if(this.controller.get('currentID') == id){
          this.controller.set('currentID', '0');
          this.controller.set('edit', false); 
        }else{
          this.controller.set('edit', true); 
          this.store.findRecord('student', id).get('marks');
          this.controller.set('currentID', id);
        }
      },

    }      
});
