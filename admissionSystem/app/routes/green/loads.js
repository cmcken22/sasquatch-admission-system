import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('load');
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
      
      deleteLoad: function(load){
        var myStore = this.get('store');
        
        if (confirm ('Are you sure you wish to delete this academic load?\n' + "This action cannot be undone")) {
            load.destroyRecord();
        }
      },
      
      updateLoad: function(id, l){
        var myStore = this.get('store');
        
        var newLoad = l;
        
        myStore.findRecord('load', id).then(function(academicLoad) {
          academicLoad.set('load', newLoad);
          academicLoad.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }

});
