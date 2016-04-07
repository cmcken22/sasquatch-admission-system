import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    currentCode: '0',
    
    
    model() {
      return Ember.RSVP.hash({
         program: this.store.findAll('academicprogramcode'),
         commentCode: this.store.findAll('commentCode')
      });
    },
    
    

    actions:{
      
        selectThis: function(id){
          if(this.controller.get('currentID') == id){
            this.controller.set('currentID', '0');
            this.controller.set('edit', false); 
          }else{
            this.controller.set('edit', true); 
            this.controller.set('currentID', id);
          }
        },
        
        cancel: function(){
          this.controller.set('edit', false);  
          this.controller.set('currentID', '0');
        },
        
        deleteProgram: function(prog){
          if (confirm ('Are you sure you wish to delete this program?\n' + "This action cannot be undone")) {
            prog.destroyRecord();
          }
        },
        

    }
      
});
