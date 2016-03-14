import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  
  userName: null,
  encryptedPassword: null,
  token: null,
  isAuthenticated: false,
  store: Ember.inject.service(),
  sNum: null,

  init() {
    this._super(...arguments);
//    this.set('userName', null);
  },

  setName(name) {
    this.set('userName', name.toLowerCase());
  },

  encrypt(password) {
    //needs sha-256 salt hashing method
    this.set('encryptedPassword', password);
  },
  
  setStudentNum(password){
    this.set('sNum', password);
  },
  
  test(){
    // var params = require('query-params');
    // var p = params.encode({'foo': 'bar', 'a': 'b'}); // 'foo=bar&a=b' 
    //id for Conner: 56b7bbb875409b2e19000001
    var id = '56b7bbb875409b2e19000001'
    var myStore = this.get('store');
      myStore.findRecord('student', id).then(function(student) {
        console.log('yoooooooo');
        console.log(student.get('firstName'));
      });
  },
  
  // create a new authorization
  // needs also to maintain the encryption
  open() {
    var username = this.get('userName');
    var password = this.get('encryptedPassword');

    // send username and password to the server and get the capability list or no access flag
    // set the capability list as a token property in this service and return true
    // or set the token property null and return false.
    //
    // var myStore = this.get('store');
    
    // var authCheck = myStore.createRecord('student', {
    //     firstName: this.get('firstName'),
    //     studentNum: this.get('studentNum')
    // });
    
    // authCheck.save();
    
    // var myStore = this.get('store');
    //   myStore.findRecord('student', this.get('sNum')).then(function(student) {
    //     console.log('yoooooooo');
    //     // student.set('firstName',self.get('selectedStudent.firstName'));
    //     // student.set('lastName', self.get('selectedStudent.lastName'));
    //     // student.set('studentNum', self.get('selectedStudent.studentNum'));
    //     // student.set('DOB', date);
    //     // student.save();  // => PATCH to /students/:student_id
    //   });
    
    
    // this is just for now
    if (password === 'ouda' && username === 'ouda') {
      var profile = {
        'name': username,
        'token': true
      };
      localStorage.setItem('uwoeng-access-token', JSON.stringify(profile));
      this.set('token', true); // should be the capability list
      this.set('isAuthenticated', true);
      return true;
    }
    else
    {
      this.close();
      return false;
    }
  },

  fetch() {
    // get info from backend database based on the token
    // if token not expired
    // assign the value of userName and the other information
    var profile = JSON.parse(localStorage.getItem('uwoeng-access-token'));
    if (profile) {
      this.set('isAuthenticated', true);
      this.set('userName', profile.name);
    }
  },

  close() {
    this.set('token', null);
    this.set('userName', null);
    this.set('encryptedPassword', null);
    this.set('isAuthenticated', false);
    window.localStorage.removeItem('uwoeng-access-token');
  }


});
