import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    course: '111',
    currentRule: '0',
    addNewLogicalExpresson:false,
    addNewRule:false,
    editAverage:false,
    
    model() {
      return Ember.RSVP.hash({
        academicprogramcode: this.store.findAll('academicprogramcode'),
        courseCode: this.store.findAll('course-code'),
        rule: this.store.findAll('admission-rule'),
        testExpression: this.store.findAll('logical-expression')
      });
    },
        
      
    actions:{
      toggleEditAverage:function(){
        if(this.controller.get('editAverage') == true){
            this.controller.set('editAverage',false);
        }else{
          this.controller.set('editAverage',true);
        }
      },
      clearAverage:function(id){
        var myStore = this.get('store');
        myStore.findRecord('academicprogramcode', id).then(function(program){
                program.set('minAverage', "0");
                program.save();
        });
        this.controller.set('editAverage',false);
      },
      saveAverage:function(id, ave){
        var myStore = this.get('store');
        myStore.findRecord('academicprogramcode', id).then(function(program){
                program.set('minAverage', ave);
                program.save();
        })
        this.controller.set('editAverage',false);
      },
      
      
      selectThis: function(id){
        if(this.controller.get('currentID') == id){
          this.controller.set('currentID', '0');
          this.controller.set('edit', false); 
          this.controller.set('addNewRule', false); 
        }else{
          this.controller.set('edit', true); 
          this.controller.set('addNewRule', false); 
          this.controller.set('currentID', id);
        }
      },

      
        saveLogicalExpression: function(min, desc){
          
            var myStore = this.get('store');
            var minimum = min;
            self = this;
            if(this.controller.get('course') == '111'){
              var thisRule = myStore.findRecord('admission-rule', self.controller.get('currentRule')).then(function(rule){
                rule.set('description', desc);
                rule.save();
              })
            }else{
              var thisRule = myStore.peekRecord('admission-rule', self.controller.get('currentRule'))
              var newCourse = myStore.peekRecord('course-code', self.controller.get('course'));
              
              var newExp = myStore.createRecord('logical-expression', {
                course: newCourse,
                minMark: minimum,
              });
              
              newExp.save().then(function(){
                thisRule.get('expressions').then((rules) => {
                  rules.pushObject(newExp)
                    
                }).then(function(){
                  thisRule.save();
                });  
              });
              
            }
            this.controller.set('addNewLogicalExpresson', false); 
          },
        
        addNewRule: function(){
          if(this.controller.get('addNewRule') == true){
            this.controller.set('addNewRule', false); 
          }else{
            this.controller.set('addNewRule', true); 
          }
        },
        deleteExpression: function(exp){
           var myStore = this.get('store');
            
            if (confirm ('Are you sure you wish to delete this Logical Expression?\n' + "This action cannot be undone")) {
                exp.destroyRecord();
            }
        },
        
        addNewCourse: function(){
          if(this.controller.get('addNewLogicalExpresson') == true){
            this.controller.set('addNewLogicalExpresson', false); 
            this.controller.set('course', '111');
          }else{
            this.controller.set('addNewLogicalExpresson', true); 
            this.controller.set('course', '111');
          }
        },
        
        manageRule: function(rule){
          if(this.controller.get('currentRule') == rule){
            this.controller.set('currentRule', '0');

          }else{
            this.controller.set('currentRule', rule);
            
          }
        }
    },
});
