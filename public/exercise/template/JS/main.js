/*
	This is the main code. Deals with global helper functions & creating the
	  control object.
*/

/*jshint esversion: 6 */ 'use strict';

/* This is a helper function to add context to a function.
	Arguments:
		t  Object    The context to give the function
		f  function  The function to add context to
	Returns: A new function which can be called. Will call the original function
	           in the given context.
*/
function contextualize (t, f)
{
	return (function () {
		return f.apply (t, arguments);
	});
}

// Code to start up the exercise
var control;
function start ()
{
	control = new Control ();
}
