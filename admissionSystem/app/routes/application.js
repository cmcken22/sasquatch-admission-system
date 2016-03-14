import Ember from 'ember';

export default Ember.Route.extend({
  // beforeModel () {
  //   this.get('oudaAuth').fetch();
  // }
  beforeModel () {
    var authentication = this.get('oudaAuth');
    var self = this;
    console.log("authentication: " + authentication);
    authentication.fetch();
    // .then(
    //   function (success) {
    //     self.transitionTo('welcome');
    // },
    //   function (error) {
    //   console.log("error -->" + error);
    // });

  }
});
