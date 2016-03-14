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
        var students = myStore.peekAll('student');
        var programCodes = myStore.peekAll('program-record');
        var termCodes = myStore.peekAll('term-code');
        var degreeCodes = myStore.peekAll('degree-code');
        var courseCodes = myStore.peekAll('course-code');
        //var residencies = myStore.peekAll('residency');
        
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
        		var studentMatch = false;
		        var degreeMatch = false;
		        var programMatch = false;
		        var termMatch = false;
		        var courseMatch = false;
        		
        		var studentObj, programObj, degreeObj, termObj, courseObj;
        		
        		results.data.forEach(function(grade) 
        		{
        		    
        		  // The loop for processing student data
        		  if(first)
        		  {
        		    first = false;
        		  }else
        		  {
        		      // Alert for all our values
        		      //if(grade[0]!="")
        		      //{
        		      //    alert("Student " + grade[1] +" code " + grade[2] +" number " + grade[3] +" section " + grade[4] +" name " + grade[5] +" unit " + grade[6] +" mark " + grade[7] + " level " + grade[8] + " status " + grade[9] + " comment " + grade[10] + " plan " + grade[11] + " semester " + grade[12] + " average " + grade[13]);
        		      //}
        		      
        		      // When there is a value in the first column in the csv, we need to do a couple of things first of which is check to see if the student
        		      // even exits. If he doesn't, we move on. Not enough information to make a student out of all that.
        		      // Then check to see if program, degree and term code exist, we won't be making new ones tonight, just want
        		      // a working version right now
        		      
        		      
        		      
        		      
        		      if(grade[0]!="")
        		      {
        		          // This is a good time to save the student object now that I think about it. See grade loading section for explanation
        		          if(studentObj != null)
        		            studentObj.save();
        		            // Should be fine to save multiple times, or at least I don't see the immediate harm in it
        		            
        		          studentMatch = false;
        		            students.forEach(function(student) 
                            {
                                if(!studentMatch)
                                {
                                    var studentString;
                                    if(student.get('studentNum') != null)
                                        studentString = student.get('studentNum').toString();
                                    else
                                        studentString = "YAWG SL'LOTH BECKONS";
                                    
                                    if(studentString.toUpperCase() == grade[1].toUpperCase())
                                    {
                                      //alert(grade[1] + " from the file is the same as " + student.get('firstName').toString() + " from our database");
                                      studentObj = student;
                                      studentMatch = true;
                                    }
                                }
                              }
                            );
                            
                            if(studentMatch)
                            {
                                // Program code, then term code, then degreeCode
                                programMatch = false;
                                programCodes.forEach(function(program) 
                                {
                                    if(!programMatch)
                                    {
                                        var statusString;
                                        if(program.get('programStatus') != null)
                                            statusString = program.get('programStatus').toString();
                                        else
                                            statusString = "ERROR";
                                           
                                        //!!!!!!! I'm going to ignore level for now, I can't make sense of it in the excel sheet (should be students year)
                                         
                                        // var levelString;
                                        // if(program.get('level'))
                                        //     levelString = program.get('level').toString();
                                        // else
                                        //     levelString = "ERROR";
                                            
                                        var commentString;
                                        if(program.get('comment') != null)
                                            commentString = program.get('comment').toString();
                                        else
                                            commentString = "ERROR";
                                            
                                        if(statusString.toUpperCase() == grade[9].toUpperCase() &&
                                            commentString.toUpperCase() == grade[10].toUpperCase())
                                        {
                                          //alert(student[1] + " from the file is the same as " + student.get('firstName').toString() + " from our database");
                                          programObj = program;
                                          programMatch = true;
                                        }
                                    }
                                  });
                                  
                                // Finding the term code
                                termMatch = false;
                                termCodes.forEach(function(term) 
                                {
                                    if(!termMatch)
                                    {
                                        var termString;
                                        if(term.get('name') != null)
                                            termString = term.get('name').toString();
                                        else
                                            termString = "ERROR";
                                            
                                        if(termString.toUpperCase() == grade[12].toUpperCase())
                                        {
                                          termObj = term;
                                          termMatch = true;
                                        }
                                    }
                                  });
                                  
                                  // Finding the term code
                                degreeMatch = false;
                                degreeCodes.forEach(function(degree) 
                                {
                                    if(!termMatch)
                                    {
                                        var degreeString;
                                        if(degree.get('name') != null)
                                            degreeString = degree.get('name').toString();
                                        else
                                            degreeString = "ERROR";
                                            
                                        if(degreeString.toUpperCase() == grade[11].toUpperCase())
                                        {
                                          degreeObj = degree;
                                          degreeMatch = true;
                                        }
                                    }
                                  });
                                  
                                  // Here is where we save our terms and progrms if necessary
                                  if(programMatch)
                                  {
                                      if(programObj.get('degree-code') == null && degreeMatch)
                                      {
                                          programObj.set('degree-code', degreeObj);
                                      }
                                      if(programObj.get('term-code') == null && termMatch)
                                      {
                                          programObj.set('term-code', termObj);
                                      }
                                      
                                      programObj.save().then(function(prog) 
                                      {
                                        studentObj.set('level', prog);
                                      }, function(reason) {
                                      // Not sure what would have gone wrong if we wind up here, and I honestly don't wanna know
                                    });;
                                  }
                            }
        		      }
        		      
        		      // Now we're at the grades portion. We don't want to skip the first line, so we get started right away. Note that 
        		      // saving grades is contingent on the student existing in the database, so we only act if studentMatch is a hit.
        		      // That said studentMatch needs to be tested extensively against wonky scenarios
        		      
        		      if(studentMatch)
        		      {
        		          //timetofindcourseskillmepleasesotired
        		          // Program code, then term code, then degreeCode
                            courseMatch = false;
                            courseCodes.forEach(function(course) 
                            {
                                if(!courseMatch)
                                {
                                    var nameString;
                                    if(course.get('name') != null)
                                        nameString = course.get('name').toString();
                                    else
                                        nameString = "ERROR";
                                       
                                    var numberString;
                                    if(course.get('number') != null)
                                        numberString = course.get('number').toString();
                                    else
                                        numberString = "ERROR";
                                    
                                    var unitString;
                                    if(course.get('unit') != null)
                                        unitString = course.get('unit').toString();
                                    else
                                        unitString = "ERROR";
                                        
                                    if(nameString.toUpperCase() == grade[5].toUpperCase() &&
                                        numberString.toUpperCase() == grade[3].toUpperCase() &&
                                        unitString.toUpperCase() == grade[6].toUpperCase())
                                    {
                                      //alert(student[1] + " from the file is the same as " + student.get('firstName').toString() + " from our database");
                                      courseObj = course;
                                      courseMatch = true;
                                    }
                                }
                              });
                              
                              // So now we should have a course. Making one here would put me one over my callback comfort zone, so let's just asssume it exists
                              // Actually might not be so bad, but don't have time to play son
                              if(courseMatch)
                              {
                                  var newGrade = myStore.createRecord('grade', {
                                        student: studentObj,
                                        course: courseObj,
                                        mark: grade[7],
                                        section: grade[4]
                                      });
                                      
                                      newGrade.save().then(function(grade) 
                                      {
                                        studentObj.get('marks').pushObject(grade);
                                      }, function(reason) {
                                      // Not sure what would have gone wrong if we wind up here, and I honestly don't wanna know
                                    });;
                              }else
                              {
                                  alert(grade[5] + " not found in the database!");
                              }
        		      }
            		  }
            		  
            	  });
            	}
              
            });
      }
      
  }
});
