import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    addNewRule:false,
    
    model() {
      return Ember.RSVP.hash({
        academicprogramcode: this.store.findAll('academicprogramcode'),
        courseCode: this.store.findAll('course-code'),
        rule: this.store.findAll('admission-rule'),
        testExpression: this.store.findAll('logical-expression')
      });
    },
    actions:{
      
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
        
        
        addNewRule: function(){
          if(this.controller.get('addNewRule') == true){
            this.controller.set('addNewRule', false); 
          }else{
            this.controller.set('addNewRule', true); 
          }
        },
  
      
      
      
    },
});
