/*
  This is the base for any Model. The Model controls the implementation for any
    exercise ; such as operations and any helper functions the exercise may need.

  Documentation:
    constructor ()
      -- Takes no arguments. Should be overloaded to take arguments ...
    draw ()
      Purpose: Draws the model.

    OVERLOAD:
      equals (other : Model) : boolean
        Purpose: Checks if two models are equal.
        Arguments:
          other  Model  The model to compare against
        Returns: Boolean. True if the models are equal.
      each (f : function)
        Purpose: Calls function f on every value in the set.
        Arguments:
          f  function  The function to call. Should be passed (value, ...) with
                         other optional arguments.
        Returns: None
      contains (value : Any) : boolean
        Purpose: Checks if a given value exists in the model.
        Arguments:
          value  Any  The value to check for
        Returns: Boolean. True if the value is in the model, false otherwise.
      copy () : Model
        Returns a clone of the model inside of a new Model.
*/
/*jshint esversion: 6 */ 'use strict';

class Model {
  constructor()
  {
  }

  draw()
  {
    var s = ()=>{
      if (!control) console.error("I'm callin' in sick today");
      else control.setModel (this); //TODO
    };

    if (!control){
      setTimeout(s, 0);
      return;
    }else {
      s();
    }

  }

  //ANY MODEL NEEDS THE FOLLOWING -
  //equals = null;
  //draw = null;
  //each = null;
  //contains = null;
  //copy     = null;
}
