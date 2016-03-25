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
        
        uploadAdmins: function(e){
            
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
            /* global Papa */
            papapa:function(toLoad){
              var myStore = this.get('store');
            var admins = myStore.peekAll('program-admin');
            
            // If the user has selected a department it will set it as the ID, if not set it to null
            // Should probably implement a way so that it is impossible to add department without a department
             var newDepartmentID = myStore.peekRecord('department', this.get('department'));
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
