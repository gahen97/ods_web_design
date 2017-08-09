/*jshint esversion: 6 */ 'use strict';

class Add extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__addMinParam__, __addMaxParam__);
  }

  // Question: Why are we doing this here? This should be an Answer thing.
  //   TODO Refactor
  computeAnswerData()
  {
    var model = this.answer.getModel ();
    var nodeId = model.add (this.parameters);

    this.answer.param ("nodeId", nodeId);
    return model;
  }


  // input -> valid if between __addMinParam__, __addMaxParam__
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
