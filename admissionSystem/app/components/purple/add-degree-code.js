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
        uploadDegreeCodes: function(file){
            var myStore = this.get('store');
            var degreeCodes = myStore.peekAll('degree-code');
            
            // For this function since degree codes don't rely on anything else, we're good to go
            // just checking for duplicate entries, skipping if they exist and creating new records
            // if they don't
            
            var toLoad = file.files[0];
        
            if(toLoad)
            {
              alert("Here's the size of the file: " + toLoad.size);
              
            }else
            {
              alert("File failed to load!");
            }
            
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
                    degreeCodes.forEach(function(localCode) 
                    {
                      if(codeMatch === false)
                      {
                        var codeString = localCode.get('name').toString();
                        if(codeString.toUpperCase() == codeName.toUpperCase())
                        {
                          alert(codeName + " from the file is the same as " + codeString + " from our database");
                          departmentMatch = true;
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(departmentMatch === false)
                    {
                      var newDepartment = myStore.createRecord('department', {
                        name: departmentName,
                        faculty: newFacultyID
                      });
                      newDepartment.save();
                    }
                    
                    departmentMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});