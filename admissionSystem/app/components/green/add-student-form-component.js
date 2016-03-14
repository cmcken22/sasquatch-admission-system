import Ember from 'ember';
import { parseStudentNum } from '../../helpers/parse-student-num';
import { parseStudentNum2 } from '../../helpers/parse-student-num';
import { validateStudentNum } from '../../helpers/parse-student-num';
import { validateStudentNumber } from '../../helpers/validate-student-form';
import { validateStudentName } from '../../helpers/validate-student-form';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  
  sex: '100',
  load: '100',
  residency: '100',
  country: '100',
  province: '100',
  city: '100',
  day: '01',
  days: Ember.String.w('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'),
  
  today: new Date(),
  //most first years applying to uni will be 18
  //therefore, the year will always be preset to the current year minus 18
  yyyy: (new Date().getFullYear()-18).toString(),
  
  
  month: '01',
  months: Ember.String.w('01 02 03 04 05 06 07 08 09 10 11 12'),
  
  year: '1997',
  years: Ember.String.w('2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000 1999 1998 1997 1996 1995 1994 1993 1992 1991 1990'),
  
  isEditing: false,
  
//================================actions=====================================//
  
  actions: {
    
    selectDay(day) {
      this.set('day', day);
      var string;
      
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
    
    saveStudent: function (day, month, year, sex, residency, load) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var sNum = this.get('studentNum');
      var myStore = this.get('store');
      var newCityID = myStore.peekRecord('city', this.get('city'));
      var newGenderID = myStore.peekRecord('gender', sex);
      var newResidencyID = myStore.peekRecord('residency', residency);
      var newLoadID = myStore.peekRecord('load', load);
      
      var newStudent = myStore.createRecord('student', {
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        studentNum: sNum,
        DOB: year+"-"+month+"-"+day,
        gender: newGenderID,
        residency: newResidencyID,
        load: newLoadID,
        city: newCityID
      });
      
      newStudent.save();
      this.set('isEditing', false);
      this.get('routing').transitionTo('green.students');
      /////////////////////////////////////////////////////////////////////////
    },
    
     addRes: function(){
        var myStore = this.get('store');
        
        var newRes = myStore.createRecord('residency', {
          residency: this.get('residency'),
        });
        newRes.save();
    },
    
    addNewStudent: function () {
      this.set('isEditing', true);
    },
    saveProgram: function(){
      
      var myStore = this.get('store');
        
        var newProg = myStore.createRecord('program', {
          programName: "Software",
        });
        newProg.save();
    },
    cancel: function () {
      this.set('firstName', '');
      this.set('lastName', '');
      this.set('studentNum', '');
      this.set('isEditing', false);
    }
  }
});