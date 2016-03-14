import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions:{
        
        setFaculty(facultyID) {
          this.set('faculty', facultyID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        addFaculty: function(){
                
            var myStore = this.get('store');
            var newFacultyID = myStore.peekRecord('faculty', this.get('faculty'));
            var newDepartment = myStore.createRecord('department', {
                name: this.get('name'),
                faculty: newFacultyID,
            });
            newDepartment.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});