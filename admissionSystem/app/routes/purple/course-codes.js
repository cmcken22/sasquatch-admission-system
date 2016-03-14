import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('course-code');
    },
    
    actions:{

    
      selectThis: function(id){
        if(this.controller.get('currentID') == id){
          this.controller.set('currentID', '0');
          this.controller.set('edit', false); 
        }else{
          this.controller.set('edit', true); 
          this.controller.set('currentID', id);
        }
      },
      
      cancel: function(){
        this.controller.set('edit', false);  
        this.controller.set('currentID', '0');
      },
      
      deleteCourse: function(course){
        course.destroyRecord();
      },
      
      
      updateCourseCode: function(id, code, number, name, unit){
        var myStore = this.get('store');
        
        var code = code;
        var number = number;
        var name = name;
        var unit = unit;
      
        
        myStore.findRecord('course-code', id).then(function(courseCode) {
          courseCode.set('code', code);
          courseCode.set('number', number);
          courseCode.set('name', name);
          courseCode.set('unit', unit);
          courseCode.save(); 
          
        });
        
        this.controller.set('currentID', '0');
      },
   }

});
