/*jshint esversion: 6 */ 'use strict';

class Find extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__findMinParam__, __findMaxParam__);
  }

  computeAnswerData()
  {
    return this.answer.getModel().find(this.parameters);
  }

  getAnswer ()
  {
    return this.answer.getData ();
  }

  // check answer ...
  //TODO I don't think this should be here, but I probably don't fully understand it.
  // You're right ... belongs inside Element, probably. I'm moving it.

  check (userModel, activeElem)
  {
    // for find, two things must be the same:
    //   1) The models should be the same
    //   2) The return values should match.
    // That is, should find the element without messing with the set.
    if (!activeElem) return false;
    if (!this.answer.getModel ().equals (userModel))
      return false;

    console.log ("Models match.");
    console.log ("Active element: ", activeElem);
    console.log ("True value: ", activeElem.getObjValue ())
    console.log ("Looking for: ", this.answer.getData ())
    return (this.answer.getData () === activeElem.getObjValue ()); // TODO better name for this?
  }

  // setting active
  canSetActive(){ return true; }

  // input: no input needed for find
}
