import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('degree-code');
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
      
      deleteDegCode: function(degreeCode){
        degreeCode.destroyRecord();
      },
      
      
      updateDegCode: function(id, name){
        var myStore = this.get('store');
        
        var name = name;
        
        myStore.findRecord('degree-code', id).then(function(degreeCode) {
          degreeCode.set('name', name);
          degreeCode.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
