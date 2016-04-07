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
    isEditing: false,
    choices: Ember.String.w('1 2 3 4 5 6 7 8 9 10'),
    
    programModel: Ember.computed(function(){
      return  this.get('store').findAll('academicprogramcode');
    }),
    
    actions:{
        
        setProgram(programID){
            this.set('program', programID);
        },
        
        setOrder(orderID){
          this.set('order', orderID);  
        },
        
        setEligibility(ellID){
          this.set('eligibility', ellID);  
        },
        
        setEdit(itr){
            if(this.get('currentITRedit') == itr){
                this.set('currentITRedit', "");
            }else{
                this.set('currentITRedit', itr);
                var myStore = this.get('store');
                
                var currentITR = myStore.peekRecord('itr', itr);
                var currentProgram = myStore.peekRecord('academicprogramcode', currentITR.get('academicprogramcode.id'));
                
                this.set('program', currentProgram.get('id'));
                this.set('order', currentITR.get('order').toString());
                this.set('eligibility', currentITR.get('eligibility'));
            }
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
            this.set('isAdding', false)
            newitr.save();
        },
        
        editItr: function(itrID){
            
            var myStore = this.get('store');
            
            var self = this;
            
            
            var newProgramID = myStore.peekRecord('academicprogramcode', self.get('program'));
            
            myStore.findRecord('itr', itrID).then(function(itr) {
                itr.set('order', self.get('order'));
                itr.set('eligibility', self.get('eligibility'));
                itr.set('academicprogramcode', newProgramID);
                itr.save(); 
            });
            this.set('currentITRedit', "");
        },
        
        deleteITR: function(itr){
            var myStore = this.get('store');
            
            if (confirm ('Are you sure you wish to delete this Intent to Register?\n' + "This action cannot be undone")) {
                itr.destroyRecord();
            }
        },
    },
});
