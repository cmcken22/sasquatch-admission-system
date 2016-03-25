import Ember from 'ember';

export function distribute(student, studentAVG, myStore) {
    console.log("************************************************************");
    console.log(student.get('firstName') + " " + student.get('lastName') + ": avg = " + studentAVG);
    
    var itrsArray = new Array();
    var gradesArray = new Array();
    
    
    
    //I HARD-CODED IN THE COMMENT CODE GIVEN WHEN AN ITR RULE IS FAILED
    var sorryCommentCode = myStore.peekRecord('comment-code', '56f488623f15ea185c000008');
    
    student.get('itrs').forEach(function(itr){
        itrsArray.push(itr);
    });
    
    student.get('marks').forEach(function(marks){
        gradesArray.push(marks);
    });
    
    function compare(a,b) {
      if (a.get('order') < b.get('order'))
        return -1;
      else if (a.get('order') > b.get('order'))
        return 1;
      else 
        return 0;
    }

    itrsArray.sort(compare);
        
    for(var i=0; i<itrsArray.length; i++){
        
        var rules       = new Array();
        var program     = itrsArray[i].get('academicprogramcode.name');
        var pro         = itrsArray[i].get('academicprogramcode');
        var order       = itrsArray[i].get('order');
        var eligible    = itrsArray[i].get('eligibility');
        
        pro.get('rules').forEach(function(rule){
            rules.push(rule);
        });
        
        console.log("working with: " + program);
        console.log("order: " + order);
        console.log("eligibility: " + eligible);
        
        var passAllRules = true;
        
        for(var y=0; y<rules.length; y++){
            console.log("<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>");
            console.log("checking rule " + y + ": " + rules[y].get('description'));
            var thisCourse      = rules[y].get('course');
            var thisCourseID    = thisCourse.get('id');
            var thisCourseName  = thisCourse.get('name');
            var minMark         = rules[y].get('minMark');
            console.log("thisCourse: " + thisCourseName + " " +  thisCourseID);
            console.log("minMark: " + minMark);
            
            var passRule = false;
            var hasCourse = false;
            
            for(var j=0; j<gradesArray.length; j++){
                if(gradesArray[j].get('course.id') === thisCourseID){
                    hasCourse = true;
                    if(parseInt(gradesArray[j].get('mark')) >= minMark){
                        passRule = true;
                        console.log("THIS RULE WAS Passed  - " + gradesArray[j].get('course.name'));
                        break;
                    }
                    else{
                        passRule = false;
                        passAllRules = false;
                        console.log("THIS RULE WAS NOT Passed  - " + gradesArray[j].get('course.name'));
                    }
                }
            }
            
            if(hasCourse == false){
                passRule = false;
                passAllRules = false;
                console.log("Student has not taken course - Rule failed");
            }
        }
        
        if(passAllRules){
            console.log("------------------------------------------------------------");
            console.log("Distributed into: " + program);
            console.log("------------------------------------------------------------");
            
            //creating the distribution object here/////////////////////////////
            var thisStudent = student;
            
            var date    = new Date();
            var day     = date.getDate();
            var month   = date.getMonth()+1;
            var year    = date.getFullYear();
            
            var commentCode;
            
            if(program == 'B.E.Sc. Electrical Engineering'){
                commentCode = 'EE';
            }
            else if(program == 'B.E.Sc. Computer Engineering (Electronic Devices for Ubiquitous Computing)'){
                commentCode = 'EC';
            }
            else if(program == 'B.E.Sc. Integrated Engineering'){
                commentCode = 'EI';
            }
            else if(program == 'B.E.Sc Mechatronic Systems Engineering'){
                commentCode = 'ED'; 
            }
            else if(program == 'B.E.Sc. Software Engineering'){
                commentCode = 'EF';
            }
            else if(program == 'B.E.Sc. Chemical Engineering'){
                commentCode = 'EB';
            }
            else if(program == 'B.E.Sc. Civil Engineering'){
                commentCode = 'EV';
            }
            else if(program == 'B.E.Sc. Mechanical Engineering'){
                commentCode = 'EM';
            }
            else if(program == 'B.E.Sc. Green Process Engineering'){
                commentCode = 'EG';
            }
            
            
            // console.log("CommentCode: " + commentCode);
            
            myStore.findAll('comment-code').then(function(comments){
                comments.forEach(function(thisComment){
                    if(commentCode == thisComment.get('code')){
                        var newdbResult = myStore.createRecord('distribution-result', {
                          date: day+"-"+month+"-"+year,
                          student: thisStudent,
                          comment: thisComment, 
                        });
                        newdbResult.save();
                    }
                });
            });
            
            ////////////////////////////////////////////////////////////////////
            break;
        }else{
            if(itrsArray.length >0){
                var thisStudent = student;
                
                var date    = new Date();
                var day     = date.getDate();
                var month   = date.getMonth()+1;
                var year    = date.getFullYear();
                
                 
                
                var newdbResult = myStore.createRecord('distribution-result', {
                  date: day+"-"+month+"-"+year,
                  student: thisStudent,
                  comment: sorryCommentCode
                });
                newdbResult.save();
            
        
            
            console.log("------------------------------------------------------------");
            console.log("Student did not pass all rules for: " + program);
            console.log("------------------------------------------------------------");
            }
        }
    }
    
  return student;
}

export default Ember.Helper.helper(distribute);