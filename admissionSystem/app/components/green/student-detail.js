import Ember from 'ember';
import { getDay } from '../../helpers/parse-date';
import { getMonth } from '../../helpers/parse-date';
import { getYear } from '../../helpers/parse-date';
import { parseStudentNum } from '../../helpers/parse-student-num';
import { validateStudentNumber } from '../../helpers/validate-student-form';
import { validateStudentName } from '../../helpers/validate-student-form';

export default Ember.Component.extend({
  
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  
  day: '01',
  days: Ember.String.w('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'),
  
  month: '01',
  months: Ember.String.w('01 02 03 04 05 06 07 08 09 10 11 12'),
  
  year: '97',
  years: Ember.String.w('2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000 1999 1998 1997 1996 1995 1994 1993 1992 1991 1990'),  
  
  isEditing: false,
  viewGrades: false,
  viewITR: false,
  isAddingGrade: false,

  currentDay: '',
  currentMonth: '',
  currentYear: '',
  studentNumber: '777',
  st: '',
  MST01IsPermitted: Ember.computed(function(){ //edit student stuff
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf('MST01') >= 0);
    }
  }),
  update2(){
    var sNum = this.get('selectedStudent.studentNum');
    var sNum2 = parseStudentNum(sNum);
    confirm(sNum2);
    this.set('selectedStudent.studentNum', sNum2);
    // this.set('studentNum', sNum);
  },

  resModel: Ember.computed(function(){
    return this.get('store').findAll('residency');
  }),
  gendersModel: Ember.computed(function(){
    return this.get('store').findAll('gender');
  }),
    loadModel: Ember.computed(function(){
    return this.get('store').findAll('load');
  }),
  countryModel: Ember.computed(function(){
    return this.get('store').findAll('country');
  }),
    provinceModel: Ember.computed(function(){
    return this.get('store').findAll('province');
  }),
  cityModel: Ember.computed(function(){
    return this.get('store').findAll('city');
  }),
  
  actions: {
    
    selectDay(day) {
      this.set('day', day);
    },
    
    selectMonth(month) {
      this.set('month', month);
    },
    
    selectYear(year) {
      this.set('year', year);
    },
    setSex(sex) {
      this.set('sex', sex);
      
    },
    
    setRes(residency) {
      this.set('residency', residency);
    },
    
    setLoad(load) {
      this.set('load', load);
      
    },
    
    setCountry(country) {
      this.set('country', country);
    },
    
    setProvince(province) {
      this.set('province', province);
    },
    
    setCity(city) {
      this.set('city', city);
    },
    
    update: function(){
      var sNum = this.get('selectedStudent.studentNum');
      var sNum2 = parseStudentNum(sNum);
      confirm(sNum2);
      this.set('selectedStudent.studentNum', sNum2);
      // this.set('studentNum', sNum);
    },
    
    edit: function(dob){
      //this.update2();
      if(this.get('isEditing') == true){
        this.set('isEditing', false);
      }else{
        
        this.set('currentDay', getDay(dob));
        this.set('day', getDay(dob));
        this.set('currentMonth', getMonth(dob));
        this.set('month', getMonth(dob));
        this.set('currentYear', getYear(dob));
        this.set('year', getYear(dob));

        console.log('editing');
        this.set('isEditing', true);
      }
    },
    

    save: function(id, day, month, year){
      var myStore = this.get('store');
      var date = year+"-"+month+"-"+day;
      var self = this;
      
      
      
      myStore.findRecord('student', id).then(function(student) {
        var fn = self.get('selectedStudent.firstName');
        var ln = self.get('selectedStudent.lastName');
        var sn = self.get('selectedStudent.studentNum');
        
        var newCityID = myStore.peekRecord('city', self.get('city'));
        var newGenderID = myStore.peekRecord('gender', self.get('sex'));
        var newResidencyID = myStore.peekRecord('residency', self.get('residency'));
        var newLoadID = myStore.peekRecord('load', self.get('load'));
        
        var sNum = validateStudentNumber(sn);
        var count = 0;
        
        if(validateStudentName(fn, ln) == 1){
          if(sNum != 0){
            
            student.set('firstName', fn);
            student.set('lastName', ln);
            student.set('studentNum', sNum);
            student.set('DOB', date);
            student.set('gender', newGenderID);
            student.set('city', newCityID);
            student.set('load', newLoadID);
            student.set('residency', newResidencyID);

            student.save();  
            self.set('isEditing', false);
            
          }
        }
      });
    },

    cancel: function(){
      this.set('isEditing', false);
      this.get('routing').transitionTo('green.students');
    },
    
    viewGrades: function(){
      if(this.get('viewGrades'))
        this.set('viewGrades', false);
      else
        this.set('viewGrades', true);
    },
    
    viewITR: function(){
      if(this.get('viewITR'))
        this.set('viewITR', false);
      else{
        this.set('viewITR', true);
      }
    }
  }
});