import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        
        setDepartment(departmentID) {
          this.set('department', departmentID);
        },
        
        addProgramAdmin: function(){
            var myStore = this.get('store');
            var newDepartmentID = myStore.peekRecord('department', this.get('department'));
            var newAdmin = myStore.createRecord('programAdmin', {
              name: this.get('name'),
              position: this.get('position'),
              department: newDepartmentID,
            });
            
            newAdmin.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
