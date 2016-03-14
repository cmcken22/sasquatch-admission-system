import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    degree:'100',
    term:'100',
    level:'100',
    //comment: '100',
    //status: '100',
    actions:{
        setDegree(DegID){
            this.set('degree', DegID);
        },
        setTerm(TermID){
            this.set('term', TermID);
        },
        setLevel(Level){
            this.set('level', Level);
        },
        addProgramRecord: function(){
            //confirm(this.get('comment'));
            var myStore = this.get('store');
            var newTerm = myStore.peekRecord('term-code', this.get('term'));
            var newDegree = myStore.peekRecord('degree-code', this.get('degree'));
            var newProgramRecord = myStore.createRecord('programRecord', {
              level: this.get('level'),
              
              comment: this.get('comment'),
              programStatus: this.get('programStatus'),
              
              term: newTerm,
              degree: newDegree
            });
            
            newProgramRecord.save();
            // this.get('routing').transitionTo('gender');
        },
    }
});
