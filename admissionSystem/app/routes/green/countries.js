import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('country');
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
      
      deleteCountry: function(country){
        var myStore = this.get('store');
        
        if (confirm ('Are you sure you wish to delete this country?\n' + "This action cannot be undone")) {
            country.destroyRecord();
        }
      },
      
      updateCountry: function(id, n){
        var myStore = this.get('store');
        
        var name = n;
        
        myStore.findRecord('country', id).then(function(country) {
          country.set('name', name);
          country.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
