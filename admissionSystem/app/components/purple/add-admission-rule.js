import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    course: '100',
    
    actions:{
        
        setCourse(courseID){
            this.set('course', courseID);
        },
        
        addAdmissionRule: function(){
            var myStore = this.get('store');
            var newCourse = myStore.peekRecord('course-code', this.get('course'));
            var newMark =  this.get('minNumber');
            
            var newRule = myStore.createRecord('admission-rule', {
              description: this.get('description'),
              course: newCourse,
              minMark: newMark,
            });
            newRule.save();
            // this.get('routing').transitionTo('gender');
        },
        

    }
});
