import Ember from 'ember';

export default Ember.Controller.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    MST01IsPermitted: Ember.computed(function(){ //edit student stuff
        // alert("yo man"); 
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf('MST01') >= 0);
        }
    }),
    
    actions:{
        setCode(code){
          this.set('currentCode', code); 
        },


    updateProgramCode: function(id, n, c, sc, min){
          
          
          var newName = n;
          var code = c;
          var subCode = sc;
          var myStore = this.get('store');
          
          var minAve = min;
          
          var newCode =  myStore.peekRecord('commentCode', this.get('currentCode'));
          
          
          myStore.findRecord('academicprogramcode', id).then(function(academicprogramcode) {
            academicprogramcode.set('name', newName);
            academicprogramcode.set('code', code);
            academicprogramcode.set('subCode', subCode);
            academicprogramcode.set('acceptionCode', newCode);
            academicprogramcode.set('minAverage', minAve);
            academicprogramcode.save(); 
            
          });
          this.set('currentID', '0');
        },
        
    },
});
