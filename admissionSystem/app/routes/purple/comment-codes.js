import Ember from 'ember';

export default Ember.Route.extend({
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    
    edit: false,
    currentID: '0',
    
    model() {
      return this.store.findAll('comment-code');
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
      
      deleteCommentCode: function(commentCode){
        commentCode.destroyRecord();
      },
      
      updateCommentCode: function(id, code, action, desc){
        var myStore = this.get('store');
        
        var code = code;
        var progAction = action;
        var desc = desc;
        
        myStore.findRecord('comment-code', id).then(function(commentCode) {
          commentCode.set('code', code);
          commentCode.set('progAction', progAction);
          commentCode.set('description', desc);
          commentCode.save(); 
        });
        
        this.controller.set('currentID', '0');
      },
    }

});
