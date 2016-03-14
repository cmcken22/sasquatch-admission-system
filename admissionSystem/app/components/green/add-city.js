import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    province: '345678',
    country: '100',
    actions:{
        
        setProvince(provinceID) {
          this.set('province', provinceID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        setCountry(countryID){
            this.set('country', countryID);
        },
        
        addCity: function(){
                
            var myStore = this.get('store');
            var newProvinceID = myStore.peekRecord('province', this.get('province'));
            var newCity = myStore.createRecord('city', {
                name: this.get('city'),
                province: newProvinceID
            });
            newCity.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
