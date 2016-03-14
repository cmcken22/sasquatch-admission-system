import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    program: '100',
    student: '100',
    order: '100',
    eligibility: '100',
    actions:{
        
        setStudent(studentID) {
          this.set('student', studentID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        setProgram(programID){
            this.set('program', programID);
        },
        setOrder(orderID){
          this.set('order', orderID);  
        },
        setElligibility(ellID){
          this.set('eligibility', ellID);  
        },
        addItr: function(){
                
            var myStore = this.get('store');
            var newProgramID = myStore.peekRecord('academicprogramcode', this.get('program'));
            var newStudentID = myStore.peekRecord('student', this.get('student'));
            var newitr = myStore.createRecord('itr', {
                eligibility: this.get('eligibility'),
                order: this.get('order'),
                program: newProgramID,
                student: newStudentID
            });
            newitr.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
