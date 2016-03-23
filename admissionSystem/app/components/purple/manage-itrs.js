import Ember from 'ember';

export default Ember.Component.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    isAdding: false,
    program: '100',
    student: '100',
    order: '100',
    eligibility: '100',
    currentITRedit: '0',
    
    actions:{
        
        setProgram(programID){
            this.set('program', programID);
        },
        setOrder(orderID){
          this.set('order', orderID);  
        },
        setElligibility(ellID){
          this.set('eligibility', ellID);  
        },
        
        
        setEdit(itr){
            this.set('currentITRedit', itr)
        },
        
        addToggle:function(){
            
            if(this.get('isAdding') == true){
                this.set('isAdding', false)
            }else{
                this.set('isAdding', true)
            }
            
        },
        cancelAdd:function(){
            
            
            this.set('isAdding', false)
            
        },
        
        addItr: function(){
                
            var myStore = this.get('store');
            var newProgramID = myStore.peekRecord('academicprogramcode', this.get('program'));
            var newStudentID = myStore.peekRecord('student', this.get('thisStudent.id'));
            
            
            
            var newitr = myStore.createRecord('itr', {
                eligibility: this.get('eligibility'),
                order: this.get('order'),
                academicprogramcode: newProgramID,
                student: newStudentID
            });
            
            newitr.save();
            // this.get('routing').transitionTo('gender');
        },
        
        deleteITR: function(itr){
            var myStore = this.get('store');
            
            if (confirm ('Are you sure you wish to delete this Intent to Register?\n' + "This action cannot be undone")) {
                itr.destroyRecord();
            }
         },
    },
});
