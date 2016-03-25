import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addProgram: function(){
            var myStore = this.get('store');
            var newProg = myStore.createRecord('academicprogramcode', {
              name: this.get('programName'),
              code: this.get('code'),
              subCode: this.get('subCode'),
            });
            newProg.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadAcademicPrograms: function(file){
            var myStore = this.get('store');
            var programCodes = myStore.peekAll('academicprogramcode');
            
            // For course codes, I consider two courses to be identical if they share
            
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
            		var databaseMatch = false;
            		
            		results.data.forEach(function(program) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var programCode = program[0];
            		    var programSubCode = program[1];
            		    var programName = program[2];
            		    
            		    //Assuming codes must have unique codes and actions, I overwrite any matches from the database
            		    // with files that we try and import.
                    programCodes.forEach(function(localProgram) 
                    {
                      if(databaseMatch === false)
                      {
                        var codeCheck = localProgram.get('code').toString();
                        
                        if(programCode.toUpperCase() == codeCheck.toUpperCase())
                        {
                          alert(programCode + " " + programName + "Already exists in our database! Overwriting values...");
                          databaseMatch = true;
                          
                          // At this point I make the assumption that though the names might be the same, it doesn't hurt to overwrite the name and unit
                          // in the case anything was changed
                          
                          localProgram.set('code', programCode);
                          localProgram.set('subCode', programSubCode);
                          localProgram.set('name', programName);
                          localProgram.save();
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(databaseMatch === false && programCode != "")
                    {
                      var newAcademicProgram = myStore.createRecord('academicprogramcode', {
                        code: programCode,
                        subCode: programSubCode,
                        name: programName
                      });
                      newAcademicProgram.save();
                    }
                    
                    databaseMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});
