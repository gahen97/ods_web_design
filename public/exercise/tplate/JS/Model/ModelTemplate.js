/*jshint esversion: 6 */ 'use strict';

class ModelTemplate extends Model {
  constructor()
  {
    super();

    // other stuff needed for the model
  }

  size()
  {
    // return size of the model ...
  }

  add(x)
  {
    // add an element to the model
  }

  remove(x)
  {
    // remove some element from the model
  }

  find(x)
  {
    // find an element from the model
  }

  equals(other)
  {
    // given another model, check if the two are equal.
    // returns true if equal, false if not.
  }

  copy()
  {
    // copy this model into a new model, returning the new model.
  }

  each (f)
  {
    // run some function f for every element in the model
  }

  contains (el)
  {
    // check if the model contains given element
    return this.find (el) !== null;
  }
}
