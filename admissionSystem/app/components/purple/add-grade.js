import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
   
    //programRecord: '100',
    //student: '100',
    //courseCode: '100',
   // mark: '',
    //section: '100',
    
    
    actions:{
        
        setStudent(studentID) {
          this.set('student', studentID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        setRecord(recordID){
            this.set('record', recordID);
        },
        
        setCourse(courseID){
            this.set('course', courseID);
        },

        addGrade: function(n, s){
            
            var myStore = this.get('store');
            
            let thisStudent = myStore.peekRecord('student', this.get('student'));
            let newProgramRecord = myStore.peekRecord('programRecord', this.get('record'));
            let newCourse = myStore.peekRecord('course-code', this.get('course'));
            
            let newGrade = myStore.createRecord('grade', {
                mark: n,
                section: s,
                course: newCourse,
                student: thisStudent,
                record: newProgramRecord
            });

            
            thisStudent.get('marks').then((marks) => {
                marks.pushObject(newGrade);
                thisStudent.save();
            });
            newGrade.save();
            
            
        },
    }
});
