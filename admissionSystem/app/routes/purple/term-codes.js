import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('term-code');
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
      deleteTermCode: function(termCode){
          termCode.destroyRecord();
        },
      
      updateTermCode: function(name, id){
        var myStore = this.get('store');
        var newName = name;
        myStore.findRecord('term-code', id).then(function(termCode) {
          termCode.set('name', newName);
          termCode.save(); 
        });
        this.controller.set('currentID', '0');
      },
  
    }
  
});

