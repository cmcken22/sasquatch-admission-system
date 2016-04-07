import Ember from 'ember';

export default Ember.Controller.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    actions:{
      
      
        saveRule: function(ruleID){
            var myStore = this.get('store');
            var thisProgram = myStore.peekRecord('academicprogramcode', this.get('currentID'));
            var thisRule = myStore.peekRecord('admission-rule', ruleID);
            
            thisProgram.get('rules').then((rules) => {
                rules.pushObject(thisRule);
                thisProgram.save();
            });
            thisRule.get('programs').then((programs) => {
                programs.pushObject(thisProgram);
                thisRule.save();
            });
            
        },
        
      setCourse(courseID){
            this.set('course', courseID);
        },
        
        removeRule:function(ruleID){
            var myStore = this.get('store');
            let thisProgram = myStore.peekRecord('academicprogramcode', this.get('currentID'));
            let thisRule = myStore.peekRecord('admission-rule', ruleID);
            
            
            thisProgram.get('rules').then((rules) => {
                rules.popObject(thisRule);
                thisProgram.save();
            });
            
        }
        
        
        
        
    },
    
});
