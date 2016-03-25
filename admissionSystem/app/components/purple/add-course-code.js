import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addCourseCode: function(){
            var myStore = this.get('store');
            var newCode = myStore.createRecord('course-code', {
              code: this.get('code'),
              number: this.get('number'),
              name: this.get('name'),
              unit: this.get('unit'),
            });
            newCode.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadCourseCodes: function(e){
          //alert(e.value.split(".").pop());s
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
      papapa: function(yep){
            var myStore = this.get('store');
            var courseCodes = myStore.peekAll('course-code');
            
            // For course codes, I consider two courses to be identical if they share
            
            
            
            /* global Papa */
            Papa.parse
            (yep, {
            	complete: function(results) 
            	{
            		var first = true;
            		var codeMatch = false;
            		
            		results.data.forEach(function(course) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var courseCode = course[0];
            		    var courseNumber = course[1];
            		    var courseName = course[2];
            		    var courseUnit = course[3];
            		    
            		    //Check to see if the faculty name matches any in the database
                    courseCodes.forEach(function(localCode) 
                    {
                      if(codeMatch === false)
                      {
                        var codeCheck = localCode.get('code').toString();
                        var numberCheck = localCode.get('number').toString();
                        
                        if(courseCode.toUpperCase() == codeCheck.toUpperCase() 
                            && courseNumber.toUpperCase() == numberCheck.toUpperCase())
                        {
                          alert(codeCheck + "  " + numberCheck + " from the database is the same as " + courseCode + " " + courseNumber + " from our database");
                          codeMatch = true;
                          
                          // At this point I make the assumption that though the names might be the same, it doesn't hurt to overwrite the name and unit
                          // in the case anything was changed
                          
                          localCode.set('code', courseCode);
                          localCode.set('number', courseNumber);
                          localCode.set('name', courseName);
                          localCode.set('unit', courseUnit);
                          localCode.save();
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(codeMatch === false && courseCode != "")
                    {
                      var newCourseCode = myStore.createRecord('course-code', {
                        code: courseCode,
                        number: courseNumber,
                        name: courseName,
                        unit: courseUnit
                      });
                      newCourseCode.save();
                    }
                    
                    codeMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});
