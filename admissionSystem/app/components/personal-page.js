import Ember from 'ember';

export default Ember.Component.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    showGrades:false,
    showITR:false,
    showResults:false,
    distributionResultModel:Ember.computed(function(){
      return  this.get('store').findAll('distributionResult');
    }),
    
    actions:{
        
        selectGrades:function(){
            if(this.get('showGrades') == true){
                this.set('showGrades', false);
            }else{
                this.set('showGrades', true);
                this.set('showITR', false);
                this.set('showResults', false);
            }
        },
        selectITR:function(){
            if(this.get('showITR') == true){
                this.set('showITR', false);
            }else{
                this.set('showGrades', false);
                this.set('showITR', true);
                this.set('showResults', false);
            }
        },
        selectResults:function(){
            if(this.get('showResults') == true){
                this.set('showResults', false);
            }else{
                this.set('showGrades', false);
                this.set('showITR', false);
                this.set('showResults', true);
            }
        },
        deleteResult:function(result){
            
            var myStore = this.get('store');
            
            if (confirm ('Are you sure you wish to delete this Distribution Result?\n' + "This action cannot be undone")) {
                result.destroyRecord();
            }
        },
        
    },
    
    
});
