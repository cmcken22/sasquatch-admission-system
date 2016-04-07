import Ember from 'ember';

import { parseStudentNum } from '../../helpers/parse-student-num';
import { getFirstName } from '../../helpers/parse-name';
import { getLastName } from '../../helpers/parse-name';

export default Ember.Controller.extend({
    
    searchByNum: 'false',
    searchByFirstName: 'false',
    searching: 'x',
    searchingFN: 'x',
    displayAll: 'x',
    num: '0',
    name: '0',
    fname: '0',
    lname: '0',
    count: '0',
    first: '',
    last: '',
    
    sortedStudents: function(){
      var model = this.get('model.student').sortBy('firstName');
      return model;
    }.property('model'),  
    
    actions: {    
      
      setStudent(student){
          if(this.get('student') === student){
            this.set('student', '100');
          }else{
              this.set('student', student);
          }
      },
      
      
    deleteItr: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING ITR! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('itr',id).then(function(itr) {
           itr.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('itr');
      }
    },
    
      searchByNum: function(){
          this.set('searchByNum', true);
          this.set('displayAll', false);
          this.set('searchByFirstName', false);
          this.set('searchingFN', false);
      },
        
        searchNum: function(num){
            this.set('num', num);
            this.set('searching', true);
        },
        
        cancelSearch: function(){
            this.set('searchByNum', false);
        },
        
        displayAll: function(){
            this.set('displayAll', true);
            this.set('searchByFirstName', false);
            this.set('searchingFN', false);
            this.set('searchByNum', false);
            this.set('searching', false);
        },
        
        searchByFirstName: function(){
            this.set('displayAll', false);
            this.set('searchingFN', false);
            this.set('searchByFirstName', true);
            this.set('searchByNum', false);
            this.set('searching', false);
        },
        
        searchFirstName: function(name){
            this.set('count', '0');
            this.set('name', name);
            var count = 0;
            var lastStart = 0;
            
            for(var i=0; i<name.length; i++){
                if(name[i] == " "){
                    count = 1;
                    this.set('count', '1');
                    lastStart = i;
                }
            }
            
            if(count == 1){
                var first = getFirstName(name, lastStart);
                this.set('fname', first);
                var last = getLastName(name, lastStart+1);
                this.set('lname', last);
            }
            else{
                this.set('fname', name);
            }
            
            this.set('displayAll', false);
            this.set('searchingFN', true);
        },
        
        cancelSearchFirstName: function(){
            this.set('searchByFirstName', false);
        },
    
    
    },
});
