import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addDegCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('degree-code', {
              name: this.get('name'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadDegreeCodes: function(e){
            
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
            /* global Papa */
            var myStore = this.get('store');
            var degreeCodes = myStore.peekAll('degree-code');
          
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
                    degreeCodes.forEach(function(localCode) 
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
                      var newDegreeCode = myStore.createRecord('degree-code', {
                        name: codeName
                      });
                      newDegreeCode.save();
                    }
                    
                    codeMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});