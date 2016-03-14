import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('faculty');
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
      
      deleteFaculty: function(gender){
        var myStore = this.get('store');
        
        if (confirm ('Are you sure you wish to delete this Faculty?\n' + "This action cannot be undone")) {
            gender.destroyRecord();
        }
      },
      
      updateFaculty: function(id, n){
        var myStore = this.get('store');
        
        var name = n;
        
        myStore.findRecord('faculty', id).then(function(faculty) {
          faculty.set('name', name);
          faculty.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
