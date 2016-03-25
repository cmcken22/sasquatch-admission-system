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
        
        uploadDepartments: function(e){
            
            
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
          papapa: function(toLoad){  /* global Papa */
          var myStore = this.get('store');
            var departments = myStore.peekAll('department');
            var newFacultyID = myStore.peekRecord('faculty', this.get('faculty'));
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