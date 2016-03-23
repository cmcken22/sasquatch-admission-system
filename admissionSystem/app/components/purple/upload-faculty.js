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
        var faculties = myStore.peekAll('faculty');
        
        var toLoad = file.files[0];
        
        if(toLoad)
        {
          alert("Loaded " + toLoad.name + " of size " + toLoad.size);
          
        }else
        {
          alert("Didn't load");
        }
        
        
        
        /* global Papa */
        
        Papa.parse
        (toLoad, {
        	complete: function(results) 
        	{
        		var first = true;
        		var facultyMatch = false;
        		
        		results.data.forEach(function(faculty) 
        		{
        		    
        		  // The loop for processing student data
        		  if(first)
        		  {
        		    first = false;
        		  }else
        		  {
        		    var facultyName = faculty[0];
        		    
        		    //Check to see if the faculty name matches any in the database
                faculties.forEach(function(localFaculty) 
                {
                  if(!facultyMatch)
                  {
                    var facultyString = localFaculty.get('name').toString();
                    if(facultyString.toUpperCase() == facultyName.toUpperCase())
                    {
                      alert(facultyName + " from the file is the same as " + facultyString + " from our database");
                    }
                  }
                });
                
                // If the gender does not exist, we add it to the database
                if(facultyMatch === false)
                {
                  var newFaculty = myStore.createRecord('faculty', {
                    name: facultyName
                  });
                  newFaculty.save();
                  
                }
        		  }
        		  
        	  });
        	}
          
        });
      }
      
  }
});
