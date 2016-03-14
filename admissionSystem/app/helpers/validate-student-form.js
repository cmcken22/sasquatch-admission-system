import Ember from 'ember';
import { validateStudentNum } from '../helpers/parse-student-num';
import { parseStudentNum2 } from '../helpers/parse-student-num';

export function validateStudentName(firstName, lastName){
    // confirm('validaa ' + firstName + lastName);
    if(!firstName && !lastName){
        confirm('Please enter FIRST and LAST NAME');
        return 0;
    }
    else if(!firstName){ //check to see if user has entered form values
        confirm('Please enter FIRST NAME');
        return 0;
    }
    else if(!lastName){
        confirm('Please enter LAST NAME');
        return 0;
    }
    else{
        return 1;
    }
}

export function validateStudentNumber(sNum/*, hash*/) {
    // confirm('validaa ' + sNum + 'length of sNum = ' + sNum.length);
    if(sNum.length < 9 || sNum.length == 10 || sNum.length > 11){
      confirm("Invalid student number!");
      return 0;
    }
    else if(sNum.length == 9 && validateStudentNum(sNum) == '406'){
      confirm("Invalid student number!");
      return 0;
    }
    else if(sNum.length == 11 || sNum.length == 9){
      if(sNum.length == 11){
        var num = parseStudentNum2(sNum);
        if(num == '406'){
          confirm("Invalid student number!");
          return 0;
        }
        else{
          // confirm('11retruning sNum' + num);
          return num;
        }
        
      }
      else if(sNum.length == 9){
        // confirm('9retruning sNum'); 
        return sNum;
      }
      if(sNum == '406'){
        confirm('Student Number is invalid'); 
        return 0;
      }
      else{
          // confirm('returning false');
          return 0;
      }
    }
}

export default Ember.Helper.helper(validateStudentNumber);
