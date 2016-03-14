import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    faculty: '100',
    
    model() {
      return Ember.RSVP.hash({
        department: this.store.findAll('department'),
        faculty: this.store.findAll('faculty')
      });
    },
    actions:{
        
        selectThis: function(id){
        
          var myStore = this.get('store');
          
          if(this.controller.get('currentID') === id){
            this.controller.set('currentID', '0');
            this.controller.set('edit', false); 
          }
          else{
            this.controller.set('edit', true); 
            this.controller.set('currentID', id);
            
            var thisDep = myStore.peekRecord('department', id);
          
            var thisFaculty;
            var controller = this.controller;
            
            
            thisDep.get('faculty').then(function(faculty) {
              thisFaculty = faculty;
            });          
          
            
            setTimeout(function(){
              controller.set('faculty', thisFaculty.id);
            },50);
         
        }
      },
      
      cancel: function(){
        this.controller.set('edit', false);  
        this.controller.set('currentID', '0');
      },
      
      deleteDepartment: function(department){
        
        if (confirm ('Are you sure you wish to delete this department?\n' + "This action cannot be undone")) {
            department.destroyRecord();
        }
      },
      
      updateDepartment: function(id, n){
        var myStore = this.get('store');
        
        var name = n;
        
        var faculty  = myStore.peekRecord('faculty', this.controller.get('faculty'));

        myStore.findRecord('department', id).then(function(department) {
          department.set('name', name);
          department.set('faculty', faculty);
          department.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
