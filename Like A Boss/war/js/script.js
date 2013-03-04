//initial background colour
var initialColour ;
var numberOfDays = 5; // sets the numbers of days in the timetable
var slots;//slots that are first clicked by user
var lastSelectedDrag;


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
		
	}
	unlockSlots(availSlots, backGroundColor);
};

var unlockSlots = function(availSlots, backGroundColor){
	var avail = availSlots.split(",");
	for (var i = 0; i < avail.length; i ++){
		var slotNumber = avail[i];
		
		var rowNumber = "row"+parseInt(slotNumber/numberOfDays); // rownumber of slot
		var columnNumber =  "col" + (slotNumber - parseInt(slotNumber/numberOfDays) * numberOfDays ); // columnnumber of slot
		//e.g a nummber 5 will yield row0 and col4
		
		//changes the background colour of avail timeslots
		var selected = $('#'+rowNumber).children("."+columnNumber);
		
		if(selected.hasClass('mark')){
			 selected.toggleClass('mark');
		 }
	}
};

var showSlotsFullMod = function (availSlots, backGroundColor){
	var avail = availSlots.split(",");
	//changes the css of desired slots into desired colours
	for (var i = 0; i < avail.length; i ++){
		var slotNumber = avail[i];
		
		var rowNumber = "row"+parseInt(slotNumber/numberOfDays); // rownumber of slot
		var columnNumber =  "col" + (slotNumber - parseInt(slotNumber/numberOfDays) * numberOfDays ); // columnnumber of slot
		//e.g a nummber 5 will yield row0 and col4
		
		//changes the background colour of avail timeslots
		var selected = $('#'+rowNumber).children("."+columnNumber);
		
		var hiddenTD = $('#'+"row"+(parseInt(slotNumber/numberOfDays)+1)).children("."+columnNumber);
		hiddenTD.remove();
		
		
		selected.attr('rowspan',2);

		selected.css('background-color', backGroundColor);
		
	}
	unlockSlots(availSlots, backGroundColor);
};

// function that locks all of the timetable cells / also does checks to ensure that half mods and full mods are in the right places of the application
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
		 //changes the background to initial colour
		 col.style.backgroundColor = initialColour;
		 // if the module is a full module and it is in a half mod slot
		 if(col.innerHTML.indexOf('full"') >= 0 ){
			 col.rowSpan = 2;
			 var hiddenTD = $('#'+"row"+(i)).children(".col"+(j-1));
			 hiddenTD.remove();
		 }
		 

		 //recitify the rowspan to 1 after the element is dropped innerHTML is to check if there is things inside the td
		 if(col.rowSpan ==2 &&( col.innerHTML.length == 0 || col.innerHTML.indexOf('half"') >= 0 )){
		
			 col.rowSpan = 1;
			 
			 //adding back the td
			 var colNum =  j-1;
			 var rowNum = i;
			 
			 //creates the TD to be appended
			 var td = $('<td></td>');
			 td.toggleClass('mark');
			 td.toggleClass('col'+colNum);
			 
			 
			 // if the slot lies on friday
			 if(colNum == numberOfDays -1){
			 	$('#row'+ rowNum).append(td);
			 }else{
				colNum++;
				//finding the td to append be
				 var tdExist = $('#row'+ rowNum).find('.col'+colNum).length;
				 
				 if(tdExist == 1){
					 $('#row'+ rowNum).find('.col'+colNum).before(td);
					 
				 }
				 	 
				 //alert("row:" + rowNum+"col:" + colNum + "tdexist:"+tdExist);
				  
				 //sometimes the next cell with that ID may be removed due to the fact that the timeslots are side by side
				 while(tdExist == 0){
					 
					 colNum++;
					 tdExist = $('#row'+ rowNum).find('.col'+colNum).length;
					 if(tdExist == 1){
						 $('#row'+ rowNum).find('.col'+colNum).before(td);
					 }
				 }
			 }
		 }
		 
	   }
	}
	
};
//shows the examtimetable
var showExamTimeTable = function(){
	
	//hide all exam timetable
	$('.exammod').each(function(){

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
				 
				 $('#'+examID).animate({backgroundColor: initialColour}, 'slow');
			 }
		 }
	   }
	}
	
};


$(document).ready(function() {
	initialColour = $('#row0').children(".col0").css('background-color');
	
	$('.drag').mousedown(function(){
		
		slots = $(this).find('> .slots').html();	
		if($(this).find('> .full').html()==null){
			showSlots(slots, '#3BB9FF');
		}
		else{
			showSlotsFullMod(slots, '#3BB9FF');
		}
		
		
		$(".trash").css('background-color', '#FF0000');
		
	});
	// if the person just click and never drag
	$('.drag').mouseup(function(){
		showSlots(slots, initialColour);
		$(".trash").css('background-color', '#6386BD');
		lockAll();
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
		
		// prepare node list of DIV elements in table2
		divNodeList = document.getElementById('table2').getElementsByTagName('div');
	
		// element is dropped
		rd.event.dropped = function () {
			
			var clonedID = rd.obj.id;
			$('#'+ clonedID).mousedown(function(){
				//gets the span that contains the available slots of which the modules can be in
				
				slots = $(this).find('> .slots').html();	
				if($(this).find('> .full').html()==null){
					showSlots(slots, '#3BB9FF');
				}
				else{
					showSlotsFullMod(slots, '#3BB9FF');
				}
				
				$(".trash").css('background-color', '#FF0000');
				
			});
			// if the person just click and never drag
			$('#'+ clonedID).mouseup(function(){

				showSlots(slots, initialColour);
				$(".trash").css('background-color', '#6386BD');
				lockAll();
			});
			
			
			//returns the slots to the initial colour 
			showSlots(slots, initialColour);
			$(".trash").css('background-color', '#6386BD');
			lockAll();
			showExamTimeTable();

		};
		
		//in an event that the item is cloned from the ORIGINAL LIST
		rd.event.clonedDropped = function (){
			var originalID = rd.objOld.id;
			//hides the item that is dragged to the timetable
			if(!$("."+originalID+'td').hasClass('hidden')){
				$("."+originalID+'td').toggleClass('hidden');
			}
		}
		
		
		rd.event.deleted = function(){
			showSlots(slots, initialColour);
			$(".trash").css('background-color', '#6386BD');
			lockAll();
			showExamTimeTable();
			
			//this only works if the ID of the original element is of 2 letters
			var unhideClassName = rd.objOld.id.substring(0,2)+"td";
		
			//shows the td back
			if($("."+unhideClassName).hasClass('hidden')){
				$("."+unhideClassName).toggleClass('hidden');
			}
		};
		
		rd.event.notCloned = function(){
			showSlots(slots, initialColour);
			lockAll();
			$(".trash").css('background-color', '#6386BD');
		}
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
	
	
	
});