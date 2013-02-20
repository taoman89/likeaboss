$(document).ready(function(){
	//$('#timetable').hide();
	$('#showselection').hide();
	
	$('#hideselection').click(function(){
		
		$('#lovely-things-list').hide();
		//$('#timetable').show();
		$('#showselection').show();
		
	});
	$('#showselection').click(function(){
		
		$('#lovely-things-list').show();
		//$('#timetable').hide();
		$('#showselection').hide();
		
	});
    /*
    * LOVELY THINGS
    */

    var options = {
    		valueNames: [ 'name', 'description', 'category' ]
    };

    var featureList = new List('lovely-things-list', options);

    $('#filter-compulsory').click(function() {
        featureList.filter(function(item) {
            if (item.values().category == "compulsory") {
                return true;
            } else {
          
                return false;
            }
        });
        return false;
    });

    $('#filter-ge').click(function() {
        featureList.filter(function(item) {
            if (item.values().category == "ge") {
                return true;
            } else {
                return false;
            }
        });
        return false;
    });
    $('#filter-none').click(function() {
        featureList.filter();
        return false;
    });
});

