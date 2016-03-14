import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        setCountry:function(countryID){
            this.controller.set('country', countryID);
        },
    }
});