import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
  
    actions:{
        addResidency: function(){
            var myStore = this.get('store');
            var newGender = myStore.createRecord('residency', {
              residency: this.get('residency'),
            });
            newGender.save();
            // this.get('routing').transitionTo('gender');
        },
        uploadResidencies: function(e) {
         //alert(e.value.split(".").pop());
         if(e.value.split(".").pop()=="xlsx"){
          var files = e.files[0];
          //alert(files);
            var reader = new FileReader();
            var name = files.name;
            var self = this;
            reader.onload = function(e) {
              var data = e.target.result;
              
              var workbook = XLSX.read(data, {type: 'binary'});
              
              /* DO SOMETHING WITH workbook HERE */
              var sheet = workbook.Sheets[workbook.SheetNames[0]];
              //alert(XLSX.utils.sheet_to_csv(sheet, {"FS": ","}));
              var csvFile = XLSX.utils.sheet_to_csv(sheet, {"FS": ","});
              self.send("papapa", csvFile);
          };
          reader.readAsBinaryString(files);
         }
         else{
           
            var toLoad = e.files[0];
            //if (file.)
            
            if(toLoad)
            {
              //alert("Loaded " + toLoad.name + " of size " + toLoad.size);
              
            }else
            {
              alert("Didn't load");
            }
            this.send("papapa", toLoad);
          }
      },
          papapa: function(toLoad){  /* global Papa */
           var myStore = this.get('store');
        var genders = myStore.peekAll('gender');
        var residencies = myStore.peekAll('residency');
            Papa.parse
            (toLoad, {
            	complete: function(results) 
            	{
            	  
            		var first = true;
            		var resMatch = false;
            		
            		results.data.forEach(function(residency) 
            		{
            		    
            		  // The loop for processing student data
            		  if(first)
            		  {
            		    first = false;
            		  }else
            		  {
            		    var resName = residency[0];
            		    
        
            		    //Check to see if the faculty name matches any in the database
                    residencies.forEach(function(localRes) 
                    {
                      if(resMatch === false)
                      {
                        var resCheck = localRes.get('residency').toString();
                        if(resName.toUpperCase() == resCheck.toUpperCase())
                        {
                          alert(resName + " from the file is the same as " + resCheck + " from our database");
                          resMatch = true;
                        }
                      }
                    });
                    
                    // If the gender does not exist, we add it to the database
                    if(resMatch === false && resName != "")
                    {
                      var newRes = myStore.createRecord('residency', {
                        residency: resName
                      });
                      newRes.save();
                    }
                    
                    resMatch = false;
    
            		  }
            		  
            	  });
            	}
              
            });
        }
    }
});