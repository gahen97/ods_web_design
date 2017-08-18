/*
  This is the template for creating AnswerTypes.

  Documentation:
    constructor()
      Initializes the answer. Should set data, model.
    check (userAnswer : Model, active : Element, userDataArray : Array of Element) : boolean
      Purpose: Checks if user's answer is correct against the actual answer.
      Arguments:
        userAnswer     Model             The current state of the user's model
        active         Element           The currently active element
        userDataArray  Array of Element  An array of every element which
                                          the user set as active, in order.
      Returns: Boolean. True if the given answer is correct.

  CAN OPTIONALLY OVERRIDE:
    display ()
      Purpose: Displays the answer. Should have an animation of some sort.
      Arguments: None
      Returns: None
    -- Any other methods from AnswerType --
*/
/*jshint esversion: 6 */ 'use strict';

class FindAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
  }

  check (userAnswer, activeElement, userData)
  {
    return activeElement.getValue () === this.data;
  }

  // display () { }

}
