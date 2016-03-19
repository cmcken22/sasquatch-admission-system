import Ember from 'ember';

export default Ember.Route.extend({
    
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
//   model: function () {
//     return this.store.find('student');
//   }
});
