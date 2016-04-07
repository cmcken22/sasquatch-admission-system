import { distribute } from '../helpers/distribute';
import { calculateAVG } from '../helpers/calculate-avg';
import { sortStudents } from '../helpers/sort-students';
import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    showPopup: false,
    resultsArray: new Array(),
    dontClose: false,
    
    model() {
      return Ember.RSVP.hash({
        
        student: this.store.findAll('student'),
        itr: this.store.findAll('itr'),
        program: this.store.findAll('academicprogramcode'),
        rules: this.store.findAll('admission-rule'),
        expressions: this.store.findAll('logical-expression'),
        course: this.store.findAll('course-code'),
        grade: this.store.findAll('grade'),
        dbResult: this.store.findAll('distribution-result'),
        comment: this.store.findAll('comment-code'),
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
          var thisStu = this.store.peekRecord('student', studentID);
          distribute(thisStu, calculateAVG(thisStu), this.store);
      },
      
      closePopup: function(){
        if(this.controller.get('dontClose') === true)
          this.controller.set('dontClose', false);
        else
          this.controller.set('showPopup', false); 
      },
      
      dontClosePopup: function(){
        this.controller.set('dontClose', true);
        this.controller.set('showPopup', true); 
      },
      
      distributeAll: function(){
        
          var students = new Array();
          var distResults = new Array();
          var self = this;
          
          this.store.findAll('student').then(function(student){
            student.forEach(function(stu){
              students.push(stu);
            });
            
            students = sortStudents(students);
          
            for(var i=0; i<students.length; i++){
              var studentAVG = calculateAVG(students[i]);
              //var newResult = distribute(students[i], studentAVG, self.store)
          
              var newResult = distribute(students[i], studentAVG, self.store);
              if(newResult){
                distResults.push(newResult);
              };

            }
            
              self.controller.set('resultsArray', distResults);
              self.controller.set('showPopup', true); 
              
          });
          
      },
      
      viewResults: function(){
        this.controller.set('showPopup', true);
      },
      
    }
});