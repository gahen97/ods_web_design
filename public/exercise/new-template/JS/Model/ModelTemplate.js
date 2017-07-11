/*jshint esversion: 6 */ 'use strict';

class Uset extends Model {
  constructor()
  {
    super();

    // anything needed for the model gets initialized here
  }

  size()
  {
    // return count of # elements
  }

  add(x)
  {
    // add x to the model ... x is value
  }

  remove(x)
  {
    // remove x from the model .... x is value
  }

  find(x)
  {
    // find x if it exists in the model. return x or null if not in the model
  }

  equals(other)
  {
    // given another model, check if the two models are equal.
    // return a boolean : true if equal, false otherwise
  }

  copy()
  {
    // copy the model into a new model. return the new model
  }



  toString ()
  {
    // convert the model to some string representation
  }

  /* NEEDED FUNCTIONS */
  each (f)
  {
    // run a function, f, for every value in the model
  }
  contains (x)
  {
    // check if a given value exists in the model
  }
}
