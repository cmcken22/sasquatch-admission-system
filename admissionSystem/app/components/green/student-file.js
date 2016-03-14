import Ember from 'ember';

export default Ember.Component.extend
({
    
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  actions: 
  {
      uploadFile: function(file)
      {
        var myStore = this.get('store');
        var genders = myStore.peekAll('gender');
        var residencies = myStore.peekAll('residency');
        
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
        		var genderMatch = false;
        		var residencyMatch = false;
        		
        		results.data.forEach(function(student) 
        		{
        		    
        		  // The loop for processing student data
        		  if(first)
        		  {
        		    first = false;
        		  }else
        		  {
        		    var studentNumber = student[0];
        		    var firstName = student[1];
        		    var lastName = student[2];
        		    var studentGender;
        		    var dob = student[4];
        		    var studentResidency;
        		    
        		    //alert("Record array contains " + genders.type);
        		    
        		    
        		    //Check to see if the gender matches anyone in the database
                genders.forEach(function(gender) 
                {
                  if(!genderMatch)
                  {
                    var genderString = gender.get('sex').toString();
                    if(genderString.toUpperCase() == student[3].toUpperCase())
                    {
                      alert(student[3] + " from the file is the same as " + genderString + " from our database");
                      studentGender = gender;
                      genderMatch = true;
                    }
                  }
                });
                
                // If gender does not exist, save it to the database then assign the new student that gender id.
                
                // Note, may be necessary to do a callback for this one, it's likely the main program will move too fast for this to work
                if(genderMatch === false)
                {
                  var newGender = myStore.createRecord('gender', {
                    sex: student[3]
                  });
                  newGender.save().then(function(value) 
                        {
                          genders = myStore.findAll('gender');
                         studentGender = newGender;
                         
                        }, function(reason) {
                        studentResidency = null;
                      });;
                  
                }
                
                
                
                //Check to see if we have a match for residency
                residencies.forEach(function(residency) 
                {
                  if(!residencyMatch)
                  {
                    var resString = residency.get('residency').toString();
                    if(resString.toUpperCase() == student[5].toUpperCase())
                    {
                      alert(student[5] + " from the file is the same as " + resString + " from our database");
                      studentResidency = residency;
                      residencyMatch = true;
                    }
                  }
                });
                
                // Note, may be necessary to do a callback for this one, it's likely the main program will move too fast for this to work
                if(residencyMatch == false)
                {
                  var newResidency = myStore.createRecord('residency', {
                    residency: student[5]
                  });
                  newResidency.save().then(function(value) 
                        {
                          residencies = myStore.findAll('residency');
                         studentResidency = newResidency;
                         
                        }, function(reason) {
                        studentResidency = null;
                      });;
                  
                }
                
                genderMatch = false;
                residencyMatch = false;
                
        		    // Should probably add functionality to save new genders and residencies as necessary
        		    
        		    var newStudent = myStore.createRecord('student', {
                    firstName: firstName,
                    lastName: lastName,
                    studentNum: studentNumber,
                    gender: studentGender,
                    residency: studentResidency,
                    DOB: dob,
                  });
                  newStudent.save();
        		  }
        		  
        	  });
        	}
          
        });
      }
      
  }
});