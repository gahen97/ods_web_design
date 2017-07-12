/*jshint esversion: 6 */ 'use strict';

/*
	NTS: We need a big refactor. We can't have exercises showing answer because
	  this is all connected to the control, view, etc.... So the control has to show
		answer, get answer from exercise, display each div, add each div to userModel, etc.

		 TODO TODO TODO TODO TODO
		(WiiU WiiU WiiU WiiU WiiU)
	*/

// SHOULD HAVE A BETTER PLACE FOR THIS EHHHH
function contextualize (t, f)
{
	return (function () {
		return f.apply (t, arguments);
	});
}

/*
	Code to start up the stuff ....
*/

var control;
function start ()
{
	control = new Control ();
}
