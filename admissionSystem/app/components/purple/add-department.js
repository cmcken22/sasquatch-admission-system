import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    
    actions:{
        
        setFaculty(facultyID) {
          this.set('faculty', facultyID);
        //   confirm('countryID: ' + this.get('country'));
        },
        
        addFaculty: function(){
                
            var myStore = this.get('store');
            var newFacultyID = myStore.peekRecord('faculty', this.get('faculty'));
            var newDepartment = myStore.createRecord('department', {
                name: this.get('name'),
                faculty: newFacultyID,
            });
            newDepartment.save();
            // this.get('routing').transitionTo('gender');
        },
        
        uploadDepartments: function(file){
            var myStore = this.get('store');
            var departments = myStore.peekAll('department');
            
            // If the user has selected a faculty it will set it as the ID, if not set it to null
            // Should probably implement a way so that it is impossible to add department without a faculty
            var newFacultyID = myStore.peekRecord('faculty', this.get('faculty'));
            
            var toLoad = file.files[0];
        
            if(toLoad)
            {
              alert("Here we are in faculties doing all sorts of crazy shit, here's a number: " + toLoad.size + " and here's the ID " + newFacultyID);
              
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
                    departments.forEach(function(localDepartment) 
                    {
                      if(departmentMatch === false)
                      {
                        var departmentString = localDepartment.get('name').toString();
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