import Ember from 'ember';
import { parseStudentNum } from '../../helpers/parse-student-num';
import { parseStudentNum2 } from '../../helpers/parse-student-num';
import { validateStudentNum } from '../../helpers/parse-student-num';
import { validateStudentNumber } from '../../helpers/validate-student-form';
import { validateStudentName } from '../../helpers/validate-student-form';


export default Ember.Route.extend({
    
    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    
    model(){
        return Ember.RSVP.hash({
            genders: this.store.findAll('gender'),
            students: this.store.findAll('student'),
            res: this.store.findAll('residency'),
            academicprogramcode: this.store.findAll('academicprogramcode'),
            load: this.store.findAll('load'),
            countries: this.store.findAll('country'),
            provinces: this.store.findAll('province'),
            cities: this.store.findAll('city'),
        });
    }
});