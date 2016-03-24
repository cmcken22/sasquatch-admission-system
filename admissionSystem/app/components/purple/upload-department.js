import Ember from 'ember';

export default Ember.Component.extend
({
    
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: 
  {
      uploadFile: function(file)
      {
        // Put in the functionality for uploading faculties in here
        var myStore = this.get('store');
        var departments = myStore.peekAll('department');
        
        var toLoad = file.files[0];
        
        if(toLoad)
        {
          //alert("Here we are in faculties doing all sorts of crazy shit, here's a number: " + toLoad.size);
          
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
        		var departmentMatch = false;
        		
        		results.data.forEach(function(department) 
        		{
        		    
        		  // The loop for processing student data
        		  if(first)
        		  {
        		    first = false;
        		  }else
        		  {
        		    var departmentName = department[0];
        		    
        		    //Check to see if the faculty name matches any in the database
                departments.forEach(function(localFaculty) 
                {
                  if(departmentMatch === false)
                  {
                    var departmentString = localFaculty.get('name').toString();
                    if(departmentString.toUpperCase() == departmentName.toUpperCase())
                    {
                      alert(departmentName + " from the file is the same as " + departmentString + " from our database");
                      departmentMatch = true;
                    }
                  }
                });
                
                // If the gender does not exist, we add it to the database
                if(departmentMatch === false)
                {
                  var newFaculty = myStore.createRecord('faculty', {
                    name: departmentName
                  });
                  newFaculty.save();
                }
                
                departmentMatch = false;

        		  }
        		  
        	  });
        	}
          
        });
      }
      
  }
});

