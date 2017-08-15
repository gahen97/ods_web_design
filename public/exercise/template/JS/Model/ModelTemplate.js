/*
  Template for a new Model. This contains all the functions needed by
    other classes and anything else can be overridden/added.

  Documentation:
    constructor ()
      Constructs a new Model.

    size () : int
      Returns the size of the model.

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

    toString () : string
      Returns a stringified version of the model.

  The model should add any other methods needed for Questions, User interaction,
    etc.
*/

/*jshint esversion: 6 */ 'use strict';

class ModelTemplate extends Model {
  constructor()
  {
    super();

    // other stuff here
  }

  size()
  {
    return 0;
  }

  equals(other)
  {
    // Check if other is equal to this model
    return true;
  }

  copy()
  {
    // Clone the model into a new model
    return null;
  }

  toString ()
  {
    // Return a stringified version of the model
    return "";
  }

  /* NEEDED FUNCTIONS */
  each (f)
  {
    // Run f on every value in the model
  }

  contains (el)
  {
    // Check if el exists within the model
    return false;
  }
}
