import Ember from 'ember';

export default Ember.Controller.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    country: '100',
    
    actions:{
      
        setFaculty(facultyID){
            this.set('faculty', facultyID);
            
        },
    }  
});
