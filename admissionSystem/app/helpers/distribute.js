import Ember from 'ember';

export function distribute(student, studentAVG, myStore) {
    
    console.log("************************************************************");
    console.log(student.get('firstName') + " " + student.get('lastName') + ": avg = " + studentAVG);
    
    var itrsArray = new Array();
    var gradesArray = new Array();
    
    var newDistribution;
    
    //I HARD-CODED IN THE COMMENT CODE GIVEN WHEN AN ITR RULE IS FAILED
    var sorryCommentCode = myStore.peekRecord('comment-code', '56fe2c5057698b2f190000fb');
    
    student.get('itrs').forEach(function(itr){
        itrsArray.push(itr);
    });
    
    student.get('grades').forEach(function(marks){
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
        var minAv = itrsArray[i].get('academicprogramcode.minAverage');
        var rules       = new Array();
        var program     = itrsArray[i].get('academicprogramcode.name');
        var pro         = itrsArray[i].get('academicprogramcode');
        var order       = itrsArray[i].get('order');
        
        
        var failString; //this will be populated with a fail reason
        
        if(studentAVG < minAv){
            
            failString = "Not Eligible for "+ program + ". " + student.get('firstName') + " did not achieve the minumum average of "+  pro.get('minAverage') +" percent.";
            
            var thisStudent = student;
            var date    = new Date();
            var day     = date.getDate();
            var month   = date.getMonth()+1;
            var year    = date.getFullYear();
            
            var newdbResult = myStore.createRecord('distribution-result', {
              date: day+"-"+month+"-"+year,
              student: thisStudent,
              comment: sorryCommentCode,
              failReason: failString
            });
            newdbResult.save();
                
            itrsArray[i].set('eligibility', '0');
            itrsArray[i].save();
                
            console.log("------------------------------------------------------------");
            console.log("Student did not have necessary aveage for: " + program);
            console.log("------------------------------------------------------------");
        }else{
        
            pro.get('rules').forEach(function(rule){
                rules.push(rule);
            });
            
            console.log("working with: " + program);
            console.log("order: " + order);
            var passAllRules = true;
            
            for(var y=0; y<rules.length; y++){
                
                var expressions = new Array();
                console.log("<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>");
                console.log("checking rule " + y + ": " + rules[y].get('description'));
                
                
                rules[y].get('expressions').forEach(function(exp){
                    expressions.push(exp);
                });
                
                
                var passRule  = false;
                var hasCourse = false;
                console.log("-->" + expressions.length);
                for(var z=0; z<expressions.length; z++){
                    
                    var thisExpression  = expressions[z];
                    var thisCourseID    = thisExpression.get('course.id');
                    var minMark         = thisExpression.get('minMark');
                    
                    for(var j=0; j<gradesArray.length; j++){
                        // if(thisCourseID == null){
                        //     alert("are we dealing with an average here?" + rules[y].get('description'));
                            
                        // }
                        if(gradesArray[j].get('course.id') === thisCourseID){
                            hasCourse = true;
                            if(parseInt(gradesArray[j].get('mark')) >= minMark){
                                passRule = true;
                                console.log("This expression was passed  - " + gradesArray[j].get('course.name'));
                                break;
                            }
                            else{
                                console.log("This expression was not passed  - " + gradesArray[j].get('course.name'));
                            }
                        }
                    }
                }
                if(passRule == true){
                    passAllRules = true;
                }else{
                    failString = "Not Eligible for "+ program + ". " + student.get('firstName') + " did not meet the requirements for RULE: " + rules[y].get('description');
                    passAllRules = false;
                }
                
                if(hasCourse == false){
                    passRule = false;
                    passAllRules = false;
                    failString = "Not Eligible for "+ program + ". " + student.get('firstName') + " has not taken the necessary courses to pass RULE: " + rules[y].get('description');
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
                
                var commentCode = pro.get('acceptionCode');
                
                newDistribution = myStore.createRecord('distribution-result', {
                  date: day+"-"+month+"-"+year,
                  student: thisStudent,
                  comment: commentCode,
                  failReason: "",
                });
                
                newDistribution.save()
                return newDistribution;
    
                
                break;
                    
                ////////////////////////////////////////////////////////////////////
                
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
                      comment: sorryCommentCode,
                      failReason: failString
                    });
                    newdbResult.save();
                    
                    itrsArray[i].set('eligibility', '0');
                    itrsArray[i].save();
                    
                    console.log("------------------------------------------------------------");
                    console.log("Student did not pass all rules for: " + program);
                    console.log("------------------------------------------------------------");
                    //return newdbResult;
                }
            }
        }
    }
}

export default Ember.Helper.helper(distribute);