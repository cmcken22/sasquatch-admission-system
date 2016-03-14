import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addLoad: function(){
            var myStore = this.get('store');
            var newLoad = myStore.createRecord('load', {
              load: this.get('load'),
            });
            newLoad.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
