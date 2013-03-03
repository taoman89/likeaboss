//initial background colour
var initialColour;
var numberOfDays = 5; // sets the numbers of days in the timetable
var slots;//slots that are first clicked by user


//shows the slots that can be dragged into
var showSlots = function (availSlots, backGroundColor){
	var avail = availSlots.split(",");
	//changes the css of desired slots into desired colours
	for (var i = 0; i < avail.length; i ++){
		var slotNumber = avail[i];
		
		var rowNumber = "row"+parseInt(slotNumber/numberOfDays); // rownumber of slot
		var columnNumber =  "col" + (slotNumber - parseInt(slotNumber/numberOfDays) * numberOfDays ); // columnnumber of slot
		//e.g a nummber 5 will yield row0 and col4
		
		//changes the background colour of avail timeslots
		var selected = $('#'+rowNumber).children("."+columnNumber);
		selected.css('background-color', backGroundColor);
		//enables or disables the marked criteria
		selected.attr('class').indexOf('mark');
		
		selected.toggleClass('mark');
		
	}
};
// function that locks all of the timetable cells
var lockAll = function(){
	var table = document.getElementById("table2");
	for (var i = 1, row; row = table.rows[i]; i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 1, col; col = row.cells[j]; j++) {
	     //iterate through columns
	     //columns would be accessed using the "col" variable assigned in the for loop
		 if(col.className.indexOf('mark')==-1){
			 col.className = col.className + ' mark';
		 }	   
	   }
	}
	
};

var showExamTimeTable = function(){
	
	//hide all exam timetable
	$('.exammod').each(function(){
	    //if statement here 
	    // use $(this) to reference the current div in the loop
	    //you can try something like...

	    if(!$(this).hasClass('hidden')){
	    	$(this).toggleClass('hidden');
	    }


	 });
	
	
	var table = document.getElementById("table2");
	
	//adding exam to exam table
	for (var i = 1, row; row = table.rows[i]; i++) {
	   //iterate through rows
	   //rows would be accessed using the "row" variable assigned in the for loop
	   for (var j = 1, col; col = row.cells[j]; j++) {
	     //iterate through columns
	     //see if the td is blank
		 if(col.innerHTML!= null && col.innerHTML!= ''){
			 var tdContent = col.innerHTML;
			 
			 var startIndex = tdContent.indexOf('class="code">');
			 
			 var examID = tdContent.substring(startIndex)
			 var startIndex = examID.indexOf('>')+1;
			 var endIndex = examID.indexOf('<');

			 var examID = examID.substring(startIndex,endIndex);
			 //examID is taken from the individual TD of the table
			 
			 if($('#'+examID).hasClass('hidden')){
				 $('#'+examID).toggleClass('hidden');
			 }
		 }
	   }
	}
	
};


$(document).ready(function() {
	

	$('.drag').mousedown(function(){
		//gets the span that contains the available slots of which the modules can be in
		initialColour = $('#row0').children(".col0").css('background-color');
		slots = $(this).find('> .slots').html();		
		showSlots(slots, '#3BB9FF',true);
		
	
		
	});
	// if the person just click and never drag
	$('.drag').mouseup(function(){

		showSlots(slots, initialColour,false);
		lockAll();
	});
	
});
/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";


var redipsInit,		// define redipsInit variable
	save,			// save elements and their positions
	report,			// function shows subject occurring in timetable
	reportButton,	// show/hide report buttons
	showAll,		// function show all subjects in timetable
	divNodeList;	// node list of DIV elements in table2 (global variable needed in report() and visibility() function)


// redips initialization
redipsInit = function () {
	var	rd = REDIPS.drag;			// reference to the REDIPS.drag object
	// initialization
	rd.init();
	// REDIPS.drag settings
	rd.dropMode = 'single';			// dragged elements can be placed only to the empty cells
	rd.hover.colorTd = '#9BB3DA';	// set hover color
	rd.clone.keyDiv = false;			// enable cloning DIV elements with pressed SHIFT key
	// prepare node list of DIV elements in table2
	divNodeList = document.getElementById('table2').getElementsByTagName('div');
	/** code not applicable 
	// show / hide report buttons (needed for dynamic version - with index.php)
	reportButton();**/
	// element is dropped
	rd.event.dropped = function () {
		var	objOld = rd.objOld,					// original object
			targetCell = rd.td.target,			// target cell
			targetRow = targetCell.parentNode,	// target row
			i, objNew;							// local variables
		// if checkbox is checked and original element is of clone type then clone spread subjects to the week


		// show / hide report buttons
		/** code not applicable 
		reportButton();**/
		
		//returns the slots to the initial colour 
		showSlots(slots, initialColour,true);
		lockAll();
		showExamTimeTable();
	};

	
	// if any element is clicked, then make all subjects in timetable visible
	rd.event.clicked = function () {
		showAll();
	};
};

// function show all subjects in timetable
showAll = function () {
	var	i; // loop variable
	for (i = 0; i < divNodeList.length; i++) {
		divNodeList[i].style.visibility = 'visible';
	}
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}