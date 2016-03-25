import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addTermCode: function(){
            var myStore = this.get('store');
            
            var newTermCode = myStore.createRecord('term-code', {
              name: this.get('name'),
            });
            
            newTermCode.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadTermCodes: function(e){
           
            
            // For this function since degree codes don't rely on anything else, we're good to go
            // just checking for duplicate entries, skipping if they exist and creating new records
            // if they don't
             //alert(e.value.split(".").pop());
         if(e.value.split(".").pop()=="xlsx"){
          var files = e.files[0];
          //alert(files);
            var reader = new FileReader();
            var name = files.name;
            var self = this;
            reader.onload = function(e) {
              var data = e.target.result;
              
              var workbook = XLSX.read(data, {type: 'binary'});
              
              /* DO SOMETHING WITH workbook HERE */
              var sheet = workbook.Sheets[workbook.SheetNames[0]];
              //alert(XLSX.utils.sheet_to_csv(sheet, {"FS": ","}));
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
            /* global Papa */
            papapa:function(toLoad){
               var myStore = this.get('store');
            var termCodes = myStore.peekAll('term-code');
            /* global Papa */
            Papa.parse
            (toLoad, {
            	complete: function(results) 
            	{
            		var first = true;
            		var codeMatch = false;
            		
            		results.data.forEach(function(code) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var codeName = code[0];
            		    
            		    //Check to see if the faculty name matches any in the database
                    termCodes.forEach(function(localCode) 
                    {
                      if(codeMatch === false)
                      {
                        var codeString = localCode.get('name').toString();
                        if(codeString.toUpperCase() == codeName.toUpperCase())
                        {
                          alert(codeName + " from the file is the same as " + codeString + " from our database");
                          codeMatch = true;
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(codeMatch === false && codeName != "")
                    {
                      var newTermCode = myStore.createRecord('term-code', {
                        name: codeName
                      });
                      newTermCode.save();
                    }
                    
                    codeMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});
