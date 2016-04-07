import Ember from 'ember';
import { parseStudentNum } from '../../helpers/parse-student-num';
import { getFirstName } from '../../helpers/parse-name';
import { getLastName } from '../../helpers/parse-name';
import { sortAlphabetically } from '../../helpers/sort-alphabetically';

export default Ember.Route.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    searchByNum: '0',
    searchByFirstName: '0',
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

    model(){
        return Ember.RSVP.hash({
            genders: this.store.findAll('gender'),
            students: this.store.findAll('student'),
            res: this.store.findAll('residency'),
            load: this.store.findAll('load'),
            academicprogramcode: this.store.findAll('academicprogramcode'),
            city: this.store.findAll('city'),
            itr: this.store.findAll('itr'),
            grade: this.store.findAll('grade'),
            //rolePermission: this.store.findAll('grade')
        });
    },

    actions:{
        searchByNum: function(){
            this.controller.set('searchByNum', true);
            this.controller.set('displayAll', false);
            this.controller.set('searchByFirstName', false);
            this.controller.set('searchingFN', false);
        },
        
        searchNum: function(num){
            this.controller.set('num', num);
            this.controller.set('searching', true);
        },
        
        cancelSearch: function(){
            this.controller.set('searchByNum', false);
        },
        
        displayAll: function(){
            this.controller.set('displayAll', true);
            this.controller.set('searchByFirstName', false);
            this.controller.set('searchingFN', false);
            this.controller.set('searchByNum', false);
            this.controller.set('searching', false);
        },
        
        searchByFirstName: function(){
            this.controller.set('displayAll', false);
            this.controller.set('searchingFN', false);
            this.controller.set('searchByFirstName', true);
            this.controller.set('searchByNum', false);
            this.controller.set('searching', false);
        },
        
        searchFirstName: function(name){
            this.controller.set('count', '0');
            this.controller.set('name', name);
            var count = 0;
            var lastStart = 0;
            
            for(var i=0; i<name.length; i++){
                if(name[i] == " "){
                    count = 1;
                    this.controller.set('count', '1');
                    lastStart = i;
                }
            }
            
            if(count == 1){
                var first = getFirstName(name, lastStart);
                this.controller.set('fname', first);
                var last = getLastName(name, lastStart+1);
                this.controller.set('lname', last);
            }
            else{
                this.controller.set('fname', name);
            }
            
            this.controller.set('displayAll', false);
            this.controller.set('searchingFN', true);
        },
        
        cancelSearchFirstName: function(){
            this.controller.set('searchByFirstName', false);
        },
        
    }
    
// "this.store" is the data store represented by the adapter
// The default data adapter is REST API adapter
});
