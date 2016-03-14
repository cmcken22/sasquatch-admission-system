import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: {
    deleteProgram: function(prog){
      prog.destroyRecord();
    },
  }
});