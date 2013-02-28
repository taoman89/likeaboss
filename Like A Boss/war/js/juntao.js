
$(document).ready(function() {
	//initial background colour
	var initialColour = $('#row0').children(".col0").css('background-color');
	var numberOfDays = 5; // sets the numbers of days in the timetable
	var slots;//slots that are first clicked by user
	

	$('.drag').mousedown(function(){
		//gets the span that contains the available slots of which the modules can be in
		slots = $(this).find('> .slots').html();		
		showSlots(slots, '#3BB9FF');

	});
	
	$('.drag').mouseup(function(){

		showSlots(slots, initialColour);
	});
	
	var showSlots = function (s, backGroundColor){
		var avail = s.split(",");
		
		for (var i = 0; i < avail.length; i ++){
			var slotNumber = avail[i];
			
			var rowNumber = "row"+parseInt(slotNumber/numberOfDays); // rownumber of slot
			var columnNumber =  "col" + (slotNumber - parseInt(slotNumber/numberOfDays) * numberOfDays ); // columnnumber of slot
			//e.g a nummber 5 will yield row0 and col4
			
			//changes the background colour of avail timeslots
			$('#'+rowNumber).children("."+columnNumber).css('background-color', backGroundColor);
		}
		
		
		
	}
	
	
});