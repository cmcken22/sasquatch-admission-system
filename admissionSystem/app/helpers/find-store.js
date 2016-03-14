import Ember from 'ember';

export function findGenderID(gender){
    store: Ember.inject.service();
    routing: Ember.inject.service('-routing');
    gID: '100';
    var myStore = this.get('store');
    myStore.findRecord('gender',{sex: gender}).then(function(gender) 
    {
        if(gender)
            return gender.id;
        else 
            return null;
    });
}

