/*jshint esversion: 6 */ 'use strict';

// TODO find a better place for this?
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
