import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions: {
    deleteProvince: function(id){
      var myStore = this.get('store');
      if (confirm ('DELETING Province! Are you sure?\n' + "this action cannot be undone")) {
        myStore.findRecord('province',id).then(function(province) 
        {
            province.destroyRecord(); // => DELETE to /students/:student_id
        });
        this.get('routing').transitionTo('provinces');
      }
    }
  }
});

