import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    today : new Date().toString(),
    dd : new Date().getDate().toString(),
    mm : (new Date().getMonth()+1).toString(), //January is 0!
    yyyy : new Date().getFullYear().toString().slice(-2),
    
    d :  new Date().getDate(),
    m : (new Date().getMonth()+1), //January is 0!
    
    day: new Date().getDate().toString(),
    days: Ember.String.w('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31'),
      
    month: (new Date().getMonth()+1).toString(),
    months: Ember.String.w('1 2 3 4 5 6 7 8 9 10 11 12'),
      
    year: new Date().getFullYear().toString().slice(-2),
    years: Ember.String.w('10 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00 99 98 97 96 95 94 93 92 91 90 89 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70'),
    
    actions:{
        
        selectDay(day) {
          this.set('day', day);
        },
        
        selectMonth(month) {
          this.set('month', month);
        },
        
        selectYear(year) {
          this.set('year', year);
        },
        
        setStudent(studentID) {
          this.set('student', studentID);
        },
        
        setComment(commentID){
            this.set('commentCode', commentID);
        },
    
        addDistributionResult: function(day, month, year){
            if(day<10) {
                day='0'+day;
            } 
            
            if(month<10) {
                month='0'+month;
            }
            var myStore = this.get('store');
            var commentCode = myStore.peekRecord('commentCode', this.get('commentCode'));
            var newStudentID = myStore.peekRecord('student', this.get('student'));
            var newResult = myStore.createRecord('distribution-result', {
              date: day+'/'+month+'/'+year,
              comment: commentCode,
              student: newStudentID
            });
            //confirm(newStudentID.firstName+ "  " + day+'/'+month+'/'+year);
            newResult.save();
        },
    }
});