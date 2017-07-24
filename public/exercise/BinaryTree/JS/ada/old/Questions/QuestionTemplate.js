/*jshint esversion: 6 */ 'use strict';

class QuestionTemplate extends Question {
  generateParameters()
  {
    // return whatever parameters should be used for this kind of question.
  }

  computeAnswerData()
  {
    // perform the operation on this question's answer.
    // note, the question's answer will automatically be set
    // to the previous question's correct answer
  }


  isValidInput (input)
  {
    // return true if the given input is allowed to be added to the model,
    // false otherwise
  }

  get validInputStr ()
  {
    // return some string representing the range of valid input
  }
}
