/*jshint esversion: 6 */ 'use strict';

// SHOULD HAVE A BETTER PLACE FOR THIS EHHHH TODO
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
