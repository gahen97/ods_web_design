/*jshint esversion: 6 */ 'use strict';

class PreOrder extends Question {
  generateParameters()
  {
    return null;
  }

  computeAnswerData()
  {
    return this.answer.generate ();
  }

  getAnswer ()
  {
    return this.answer.getData ();
  }

  get name () { return "Pre-order"; }
  get fullName () { return "Pre-order"; }
  get exerciseName () { return "Pre-Order Traversal"; }

  // check answer ...
  //TODO I don't think this should be here, but I probably don't fully understand it.
  // You're right ... belongs inside Element, probably. I'm moving it.

  check (userModel, activeElem, userData)
  {
    // for find, two things must be the same:
    //   1) The models should be the same
    //   2) The return values should match.
    // That is, should find the element without messing with the set.
    if (!activeElem) return false;
    if (!this.answer.getModel ().equals (userModel))
      return false;

    return this.answer.check (userData); // TODO better name for this?
  }

  // setting active
  canSetActive(){ return true; }

  // input: no input needed for find


  start (){
    setTimeout (()=>{
      control.setRootActive ();
    }, 1);
  }
}
