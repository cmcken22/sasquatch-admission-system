// Manage the behaviour of the login screen
import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  
  showPass: false,
  
  actions: {
    login(){
      this.get('oudaAuth').encrypt(this.get('password'));
      this.get('oudaAuth').setStudentNum(this.get('password'));
      this.get('oudaAuth').setName(this.get('name'));
      if (this.get('oudaAuth').open() === true) {
        this.get('routing').transitionTo('welcome');
      }
      else {
        // you may route to another template to create account

      }
    },
    
    test(){
      this.get('oudaAuth').setName(this.get('name'));
      this.get('oudaAuth').setStudentNum(this.get('password'));
      this.get('oudaAuth').test();
    },
    
    forgot(){
      confirm('Youre an idiot');
    }
    
  }
});
