import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    
    edit: false,
    currentID: '0',
    country: '100',
    
    model() {
      return Ember.RSVP.hash({
        province: this.store.findAll('province'),
        country: this.store.findAll('country')
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
            
            var thisProv = myStore.peekRecord('province', id);
          
            var thisCountry;
            var controller = this.controller;
            
            
            thisProv.get('country').then(function(country) {
              thisCountry = country;
            });          
          
            
            setTimeout(function(){
              controller.set('country', thisCountry.id);
            },50);
         
        }
      },
      
      cancel: function(){
        this.controller.set('edit', false);  
        this.controller.set('currentID', '0');
      },
      
      deleteProvince: function(province){
        
        if (confirm ('Are you sure you wish to delete this province?\n' + "This action cannot be undone")) {
            province.destroyRecord();
        }
      },
      
      updateProvince: function(id, n){
        var myStore = this.get('store');
        
        var name = n;
        
        var country  = myStore.peekRecord('country', this.controller.get('country'));

        
        myStore.findRecord('province', id).then(function(province) {
          province.set('name', name);
          province.set('country', country);
          province.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
