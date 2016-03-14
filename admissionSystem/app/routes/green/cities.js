import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    province: '345678',
    country: '100',
    
    model() {
      return Ember.RSVP.hash({
        provinces: this.store.findAll('province'),
        cities: this.store.findAll('city'),
        countries: this.store.findAll('country')
      });
    },
    
    actions:{
        
        selectThis: function(id, prov){
        
          var myStore = this.get('store');
          
          if(this.controller.get('currentID') == id){
            this.controller.set('currentID', '0');
            this.controller.set('edit', false); 
          }
          else{
            this.controller.set('edit', true); 
            this.controller.set('currentID', id);
            
            var thisCity = myStore.peekRecord('city', id);
          
            var thisProvince;
            var thisCountry;
            var controller = this.controller;
            
            
            thisCity.get('province').then(function(prov) {
              thisProvince = prov;
              if(thisProvince){
                thisProvince.get('country').then(function(country) {
                  thisCountry= country;
                });
              }
            });          
          
            
            setTimeout(function(){
              controller.set('country', thisCountry.id);
              controller.set('province', thisProvince.id);
            },50)
         
        }
      },
      
      cancel: function(){
        this.controller.set('edit', false);  
        this.controller.set('currentID', '0');
      },
      
      deleteCity: function(country){
        var myStore = this.get('store');
        
        if (confirm ('Are you sure you wish to delete this city?\n' + "This action cannot be undone")) {
            country.destroyRecord();
        }
      },
      
      updateCity: function(id, n){
        var myStore = this.get('store');
        
        var name = n;
        
        var province  = myStore.peekRecord('province', this.controller.get('province'));
        
        
        var newProvinceID = myStore.peekRecord('province', this.get('province'));
        
        myStore.findRecord('city', id).then(function(city) {
          city.set('name', name);
          city.set('province', province);
          city.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }
});
