import Ember from 'ember';

export default Ember.Component.extend({
    
    currentProgram:'0',
    
    actions:{
        selectProgram(id){
            this.set('currentProgram', id);
        }
    }
});
