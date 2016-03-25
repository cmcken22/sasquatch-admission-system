import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addCommentCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('comment-code', {
              code: this.get('code'),
              progAction: this.get('progAction'),
              description: this.get('description'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadCommentCodes: function(e){
             alert(e.value.split(".").pop());
         if(e.value.split(".").pop()=="xlsx"){
          var files = e.files[0];
          alert(files);
            var reader = new FileReader();
            var name = files.name;
            var self = this;
            reader.onload = function(e) {
              var data = e.target.result;
              
              var workbook = XLSX.read(data, {type: 'binary'});
              
              /* DO SOMETHING WITH workbook HERE */
              var sheet = workbook.Sheets[workbook.SheetNames[0]];
              alert(XLSX.utils.sheet_to_csv(sheet, {"FS": ","}));
              var csvFile = XLSX.utils.sheet_to_csv(sheet, {"FS": ","});
              self.send("papapa", csvFile);
          };
          reader.readAsBinaryString(files);
         }
         else{
           
            var toLoad = e.files[0];
            //if (file.)
            
            if(toLoad)
            {
              alert("Loaded " + toLoad.name + " of size " + toLoad.size);
              
            }else
            {
              alert("Didn't load");
            }
            this.send("papapa", toLoad);
          }
      },
            papapa: function(toLoad){
            var myStore = this.get('store');
            var commentCodes = myStore.peekAll('comment-code');
            /* global Papa */
            Papa.parse
            (toLoad, {
            	complete: function(results) 
            	{
            		var first = true;
            		var commentMatch = false;
            		
            		results.data.forEach(function(comment) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var commentCode = comment[0];
            		    var commentAction = comment[1];
            		    var commentDesc = comment[2];
            		    
            		    //Assuming codes must have unique codes and actions, I overwrite any matches from the database
            		    // with files that we try and import.
                    commentCodes.forEach(function(localComment) 
                    {
                      if(commentMatch === false)
                      {
                        var codeCheck = localComment.get('code').toString();
                        var actionCheck = localComment.get('progAction').toString();
                        
                        if(commentCode.toUpperCase() == codeCheck.toUpperCase() 
                            && commentAction.toUpperCase() == actionCheck.toUpperCase())
                        {
                          alert(codeCheck + "  " + actionCheck + " from the database is the same as " + commentCode + " " + commentAction + " from our database");
                          commentMatch = true;
                          
                          // At this point I make the assumption that though the names might be the same, it doesn't hurt to overwrite the name and unit
                          // in the case anything was changed
                          
                          localComment.set('code', commentCode);
                          localComment.set('progAction', commentAction);
                          localComment.set('description', commentDesc);
                          localComment.save();
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(commentMatch === false && commentCode != "")
                    {
                      var newCommentCode = myStore.createRecord('comment-code', {
                        code: commentCode,
                        progAction: commentAction,
                        description: commentDesc
                      });
                      newCommentCode.save();
                    }
                    
                    commentMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});