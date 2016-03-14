import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    edit: false,
    currentID: '0',
    
    
    model() {
      return this.store.findAll('residency');
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
      
      deleteResidency: function(residency){
        if (confirm ('Are you sure you wish to delete this residency?\n' + "This action cannot be undone")) {
          residency.destroyRecord();
        }
        
      },
      
      updateResidency: function(id, res){
        var myStore = this.get('store');
        
        var residency = res;
        
        myStore.findRecord('residency', id).then(function(res) {
          res.set('residency', residency);
          res.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
