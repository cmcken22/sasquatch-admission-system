import Ember from 'ember';

export default Ember.Component.extend
({
    
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: 
  {
      uploadFile: function(e)
      {
        // Put in the functionality for uploading faculties in here
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
        
        /* global Papa */
        var myStore = this.get('store');
        var faculties = myStore.peekAll('faculty');
        
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
                  if(facultyMatch === false)
                  {
                    var facultyString = localFaculty.get('name').toString();
                    if(facultyString.toUpperCase() == facultyName.toUpperCase())
                    {
                      alert(facultyName + " from the file is the same as " + facultyString + " from our database");
                      facultyMatch = true;
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
                
                facultyMatch = false;

        		  }
        		  
        	  });
        	}
          
        });
      }
      
  }
});
