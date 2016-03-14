import Ember from 'ember';

export function parseStudentNum(n) {
  return n[0]+n[1]+n[2] +" "+ n[3]+n[4]+n[5] +" "+ n[6]+n[7]+n[8];
}

export function parseStudentNum2(n) {
    // confirm('using f2');
  if(n[0] != ' ' && n[1] != ' ' && n[2] != ' ' && n[4] != ' ' && n[5] != ' ' && n[6] != ' ' &&n[8] != ' ' && n[9] != ' ' && n[10] != ' '){
      if(n[3] == ' ' && n[7] == ' '){
          //user has entered in a format including spaces
          //return with no spaces
          // confirm('pS2 returning: ' + n[0]+n[1]+n[2] + n[4]+n[5]+n[6] + n[8]+n[9]+n[10] );
          return n[0]+n[1]+n[2] + n[4]+n[5]+n[6] + n[8]+n[9]+n[10];
      }
      else{
        // confirm('pS2 returning: 406'); 
        return '406';//number is not in correct format
      }
  }
  else{
    // confirm('pS2 returning: 406'); 
    return '406';//number is not in correct format
  }
}

export function validateStudentNum(n) {
  // confirm('validateStudentNum');
  var count = 0;
  for(var i=0;i<9;i++){
    if(n[i] == ' '){
      confirm(i);
      count++;
    }
  }
  if(count == 0){
    // confirm('count = 0');
    return n;
  }
  else {
    return '406';
    
  }
}
