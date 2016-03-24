import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        
        setDepartment(departmentID) {
          this.set('department', departmentID);
        },
        
        addProgramAdmin: function(){
            var myStore = this.get('store');
            var newDepartmentID = myStore.peekRecord('department', this.get('department'));
            var newAdmin = myStore.createRecord('programAdmin', {
              name: this.get('name'),
              position: this.get('position'),
              department: newDepartmentID,
            });
            
            newAdmin.save();
            // this.get('routing').transitionTo('gender');
        },
        
        uploadAdmins: function(file){
            var myStore = this.get('store');
            var admins = myStore.peekAll('program-admin');
            
            // If the user has selected a department it will set it as the ID, if not set it to null
            // Should probably implement a way so that it is impossible to add department without a department
             var newDepartmentID = myStore.peekRecord('department', this.get('department'));
            
            var toLoad = file.files[0];
        
            if(toLoad)
            {
              alert("Here we are in faculties doing all sorts of crazy shit, here's a number: " + toLoad.size + " and here's the ID " + newDepartmentID);
              
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
            		var adminMatch = false;
            		
            		results.data.forEach(function(admin) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var adminName = admin[0];
            		    var adminPosition = admin[1];
            		    
            		    //Check to see if the faculty name matches any in the database
                    admins.forEach(function(localAdmin) 
                    {
                      if(adminMatch === false)
                      {
                        var adminString = localAdmin.get('name').toString();
                        if(adminString.toUpperCase() == adminName.toUpperCase())
                        {
                          alert(adminName + " from the file is the same as " + adminString + " from our database");
                          adminMatch = true;
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(adminMatch === false)
                    {
                      var newAdmin = myStore.createRecord('program-admin', {
                        name: adminName,
                        position: adminPosition,
                        department: newDepartmentID
                      });
                      newAdmin.save();
                    }
                    
                    adminMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});
