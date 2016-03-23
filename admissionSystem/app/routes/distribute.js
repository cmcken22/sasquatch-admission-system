import { distribute } from '../helpers/distribute';
import { calculateAVG } from '../helpers/calculate-avg';
import { sortStudents } from '../helpers/sort-students';
import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return Ember.RSVP.hash({
        
        student: this.store.findAll('student'),
        itr: this.store.findAll('itr'),
        program: this.store.findAll('academicprogramcode'),
        rules: this.store.findAll('admission-rule'),
        course: this.store.findAll('course-code'),
        grade: this.store.findAll('grade'),
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
          this.store.findRecord('student', id).get('itrs');
          this.controller.set('currentID', id);
        }
      },
      
      distribute: function(studentID){
          distribute(this.store.peekRecord('student', studentID));
      },
      
      distributeAll: function(){
        
          var students = new Array();
          var self = this;
          
          this.store.findAll('student').then(function(student){
            student.forEach(function(stu){
              students.push(stu);
            });
            
            students = sortStudents(students);
          
            for(var i=0; i<students.length; i++){
              var studentAVG = calculateAVG(students[i]);
              distribute(students[i], studentAVG);
            }
            
          });
      },
    }
});
