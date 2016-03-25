import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome');
  this.route('login', {path:'/'});
  this.route('authenticate');


  this.route('green', {path: '/students'} , function() {
    this.route('genders');
    this.route('gender', { path: 'genders/:gender_id'});
    this.route('add-student-form');
    this.route('add-student');
    this.route('cities');
    this.route('city',{path:'cities/:city_id'});
    this.route('countries');
    this.route('country', { path: 'countries/:country_id'});
    this.route('residencies');
    this.route('residency', { path: 'residencies/:residency_id'});
    this.route('upload-students');
    this.route('upload-grades');
    this.route('loads');
    this.route('load', { path: 'loads/:load_id'});
    this.route('provinces');
    this.route('province', {path:'provinces/:province_id'});
    this.route('students', { path: '/'});
    this.route('student', { path: ':student_id'});
  });


  this.route('purple', {path: '/settings'} , function() {
    this.route('programs');
    this.route('program', { path: 'programs/:program_id'});
    this.route('degree-codes');
    this.route('degree-code', { path: 'degree-codes/:degree-code_id'});
    this.route('term-codes');
    this.route('term-code', { path: 'term-codes/:term-code_id'});
    this.route('course-code');
    this.route('course-codes');
    this.route('faculty');
    this.route('faculties');
    this.route('departments');
    this.route('department');
    this.route('program-admin', {path:'program-admins/:program-admin_id'});
    this.route('program-admins');
    this.route('program-records');
    this.route('program-record',{path:'program-records/:program-record_id'});
    this.route('logical-expression');
    this.route('logical-expressions');
    this.route('grade', {path:'grades/:grade_id'});
    this.route('grades');
  });
  this.route('purple', {path: '/grades'} , function() {
   this.route('grade', {path:':grade_id'});
    this.route('grades', { path: '/'});
  });
  


  this.route('students');
  this.route('purple', {path: '/distribute-students'} , function() {
    this.route('admission-rule');
    this.route('admission-rules');
    this.route('distribution-result');
    this.route('distribution-results');
    this.route('comment-code');
    this.route('comment-codes');
    this.route('itrs');
    this.route('itr', {path:'itrs/:itr_id'});
  });
  this.route('distribute');
  this.route('adminPortal');
  this.route('distribute-students');
  this.route('settings');
});

export default Router;
