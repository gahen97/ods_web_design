/*jshint esversion: 6 */ 'use strict';

/*
	NTS: We need a big refactor. We can't have exercises showing answer because
	  this is all connected to the control, view, etc.... So the control has to show
		answer, get answer from exercise, display each div, add each div to userModel, etc.

		 TODO TODO TODO TODO TODO
		(WiiU WiiU WiiU WiiU WiiU)
	*/

/*
	Code to start up the stuff ....
*/

var control;
function start ()
{
	// TODO: Find a convenient place for this
	$("#trash").droppable ({
		tolerance: "touch",
		over: function(event, ui ){
			$(this).attr('src', "exercise/uset/images/trashcan_open.png");
		},
		out: function(event, ui ){
			$(this).attr('src', "exercise/uset/images/trashcan.png");
		},
		drop: function() {
			$(this).attr('src', "exercise/uset/images/trashcan.png");
		}
	});

	control = new Control ();
}
