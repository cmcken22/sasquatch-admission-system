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
  
  update2(){
    var sNum = this.get('selectedStudent.studentNum');
    var sNum2 = parseStudentNum(sNum);
    confirm(sNum2);
    this.set('selectedStudent.studentNum', sNum2);
    // this.set('studentNum', sNum);
  },


  
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
    
    update: function(){
      var sNum = this.get('selectedStudent.studentNum');
      var sNum2 = parseStudentNum(sNum);
      confirm(sNum2);
      this.set('selectedStudent.studentNum', sNum2);
      // this.set('studentNum', sNum);
    },
    
    edit: function(dob){
      //this.update2();
      this.set('currentDay', getDay(dob));
      this.set('day', getDay(dob));
      this.set('currentMonth', getMonth(dob));
      this.set('month', getMonth(dob));
      this.set('currentYear', getYear(dob));
      this.set('year', getYear(dob));
      console.log('editing');
      this.set('isEditing', true);
    },
    
    // addingGrade: function(){
    //   this.set('isAddingGrade',true);
    // },
    
    save: function(id, day, month, year){
      var myStore = this.get('store');
      var date = year+"-"+month+"-"+day;
      var self = this;
      // var stu = myStore.findRecord('student', id);
      // confirm('stu: ' + stu.id);
      myStore.findRecord('student', id).then(function(student) {
        var fn = self.get('selectedStudent.firstName');
        var ln = self.get('selectedStudent.lastName');
        var sn = self.get('selectedStudent.studentNum');
        var sNum = validateStudentNumber(sn);
        var count = 0;
        // confirm('STUDENT: ' + student.firstName);
        // confirm('student.firstName: ' + student.firstName);
        // confirm('fn: ' + fn);
        if(validateStudentName(fn, ln) == 1){
          if(sNum != 0){
            //ERROR WAS HERE - TRYING TO SET isEditing TO FALSE
            // isEding is undefined here
            // this.set('isEditing', false);
            student.set('firstName', fn);
            student.set('lastName', ln);
            student.set('studentNum', sNum);
            student.set('DOB', date);
            student.save();  // => PATCH to /students/:student_id
            self.set('isEditing', false);
            // this.get('routing').transitionTo('students');
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