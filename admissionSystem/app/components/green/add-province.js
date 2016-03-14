import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    country: '345678',
    actions:{
        
        setCountry(countryID) {
          this.set('country', countryID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        addProvince: function(){
                
            var myStore = this.get('store');
            var newCountryID = myStore.peekRecord('country', this.get('country'));
            var newProvince = myStore.createRecord('province', {
                name: this.get('province'),
                country: newCountryID,
            });
            newProvince.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
