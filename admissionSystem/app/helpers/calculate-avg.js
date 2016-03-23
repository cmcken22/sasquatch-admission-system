import Ember from 'ember';

export function calculateAVG(student) {
    
    var gradesArray = new Array();
    
    student.get('marks').forEach(function(marks){
        gradesArray.push(marks);
    });
    
    var avg = 0;
    var count = 0;
    
    for(var j=0; j<gradesArray.length; j++){
        avg = avg + parseInt(gradesArray[j].get('mark'));
        count++;
    }
    
    avg = avg/count;
    
  return avg;
}

export default Ember.Helper.helper(calculateAVG);
