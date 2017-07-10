/*jshint esversion: 6 */ 'use strict';

class Add extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__addMinParam__, __addMaxParam__);
  }

  computeAnswerData(prevAnswer)
  {
    // Computes the answer for a given question, given the previous answer (contains model, data)
    return this.answer.getModel().add(this.parameters);
  }

  isValidInput (input)
  {
    if (!input && input !== 0) return false;

    var int = Number (input); // NOTE: Can't use parseInt, because "3 X" is valid.
    if (!int && int !== 0) return false;

    return (int >= __addMinParam__ && int <= __addMaxParam__);
  }

  get validInputStr ()
  {
    return __addMinParam__ + " - " + __addMaxParam__;
  }
}
