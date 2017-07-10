/*jshint esversion: 6 */ 'use strict';

class QuestionTemplate extends Question {
  generateParameters()
  {
    // Returns some value which will be used as the parameter for the given question
  }

  computeAnswerData(prevAnswer)
  {
    // Computes the answer for a given question, given the previous answer (contains model, data)
  }

  /* Can also overload:
      isValidInput    If returns true, given input will be added to the model for a question
        Note, if this is overloaded, should also overload
          get validInputStr ()
      canSetActive    If returns true, given element will be selected as active
  */
}
