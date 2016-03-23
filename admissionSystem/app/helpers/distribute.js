import Ember from 'ember';

export function distribute(student, studentAVG) {
    console.log("************************************************************");
    console.log(student.get('firstName') + " " + student.get('lastName') + ": avg = " + studentAVG);
    
    var eligibility;
    
    var itrsArray = new Array();
    var gradesArray = new Array();
    
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
            console.log("Distributed into " + program);
            console.log("------------------------------------------------------------");
            break;
        }else{
            console.log("------------------------------------------------------------");
            console.log("Student did not pass all rules for " + program);
            console.log("------------------------------------------------------------");
        }
    }
    
  return student;
}

export default Ember.Helper.helper(distribute);