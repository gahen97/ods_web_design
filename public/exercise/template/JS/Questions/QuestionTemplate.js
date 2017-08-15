/*
  Template for creating a Question.

  Documentation:
    generateParameters () : Any
      Returns parameters needed for the question.
    computeAnswerData () : Model
      Computes data required for the answer and returns the finalized model.
    canSetActive(): boolean
      Returns true if elements can be set as active for the question.
    isValidInput (input : string) : boolean
      Purpose: Determines if a given string of input is valid.
      Arguments:
        input  string  The input the user is trying to add
      Returns: Boolean. True if the input is valid
    displayAnswer (div : DOMObject)
      Purpose: Displays the answer in the given DOM Element.
      Arguments:
        div  DOMObject  The element to display the answer inside of
      Returns: None

  READ-ONLY PROPERTIES:
    validInputStr  string  A stringified range of valid input for the question.

  See Question.js under Base for further documentation.
  Overload anything required for the question ...
*/
/*jshint esversion: 6 */ 'use strict';

class QuestionTemplate extends Question {
  generateParameters()
  {
    return null;
  }

  computeAnswerData()
  {
    return null;
  }

  canSetActive () { return false; }

  isValidInput (input)
  {
    return false;
  }

  get validInputStr ()
  {
    return "";
  }

  displayAnswer (div)
  {

  }
}
