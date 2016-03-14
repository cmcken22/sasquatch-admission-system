import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    edit: false,
    currentID: '0',
    
    
    model() {
      return this.store.findAll('gender');
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
      
      deleteGender: function(gender){
        var myStore = this.get('store');
        
        if (confirm ('Are you sure you wish to delete this gender?\n' + "This action cannot be undone")) {
            gender.destroyRecord();
        }
      },
      
      updateGender: function(id, s){
        var myStore = this.get('store');
        
        var sex = s;
        
        myStore.findRecord('gender', id).then(function(gender) {
          gender.set('sex', sex);
          gender.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
