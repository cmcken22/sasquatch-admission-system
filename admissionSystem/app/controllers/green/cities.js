import Ember from 'ember';

export default Ember.Controller.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    province: '345678',
    country: '100',
    
    actions:{
      
        setCountry(countryID){
            this.set('country', countryID);
            this.set('province', 100);
            
        },
        setProvince(provinceID){
            this.set('province', provinceID);
        },
    }        
});
