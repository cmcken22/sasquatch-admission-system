import { calculateAVG } from '../helpers/calculate-avg';
import Ember from 'ember';

export function sortStudents(students) {
    function compare(a,b) {
        var aa = calculateAVG(a);
        var bb = calculateAVG(b);
        if (aa > bb)
          return -1;
        else if (aa < bb)
          return 1;
        else 
          return 0;
      }
    
      students.sort(compare);
  return students;
}

export default Ember.Helper.helper(sortStudents);
