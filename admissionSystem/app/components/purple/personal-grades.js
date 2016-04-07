import Ember from 'ember';

export default Ember.Component.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    isAdding: false,
    
    currentGradeEdit: "",
    course: "100",
    
    courseCodeModel: Ember.computed(function(){
      return  this.get('store').findAll('courseCode');
    }),
    MST01IsPermitted: Ember.computed(function(){ //edit student stuff
        //alert("yo man"); 
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf('MST01') >= 0);
        }
    }),
    actions:{
        setEdit:function(id){
            if(this.get('currentGradeEdit') == id){
                this.set('currentGradeEdit', "");
            }else{
                this.set('currentGradeEdit', id);
            }
        },
        setCourse(courseID){
            this.set('course', courseID);
        },
        addToggle:function(id){
            if(this.get('isAdding') == true){
                this.set('isAdding', false);
            }else{
                this.set('isAdding', true);
            }
        },
        addGrade: function(m){
            var myStore = this.get('store');
            var self = this;
            
            var newStud = myStore.peekRecord('student', this.get('thisStudent.id'));
            var newCourse = myStore.peekRecord('courseCode', this.get('course'));
            
            let newGrade = myStore.createRecord('grade', {
                mark: m,
                course: newCourse,
                student: newStud,
            });
            newGrade.save().then(function(){
                newStud.get('grades').then((marks) => {
                    marks.pushObject(newGrade);
                    newStud.save();
                });
            });
        },
        deleteGrade: function(grade){
            var myStore = this.get('store');
            
            if (confirm ('Are you sure you wish to delete this Grade?\n' + "This action cannot be undone")) {
                grade.destroyRecord();
            }
        },
        editGrade: function(gradeID, mark){
            
            var myStore = this.get('store');
            var self = this;
            
            myStore.findRecord('grade', gradeID).then(function(grade) {
                grade.set('mark', mark);
                grade.save(); 
            });
            
            this.set('currentGradeEdit', "");
        },
    },
    
});
