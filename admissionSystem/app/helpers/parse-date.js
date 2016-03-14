import Ember from 'ember';

// DATE FORMAT: 1994-09-27
// DATE FORMAT: yyyy-mm-dd

export function getDay(params) {
  return params[8] + params[9];
}

export function getMonth(params) {
  return params[5] + params[6];
}

export function getYear(params) {
  return params[0] + params[1] + params[2] + params[3];
}