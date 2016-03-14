import Ember from 'ember';

export default Ember.Route.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
   model(){
        return Ember.RSVP.hash({
            genders: this.store.findAll('gender'),
            res: this.store.findAll('residency')
        });
    }
});
