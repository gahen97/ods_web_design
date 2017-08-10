/*jshint esversion: 6 */ 'use strict';

class AddBase extends Question {
  generateParameters()
  {
    return {
      index: ODSRandom.getRandomIntInclusive(0, this.model.size() - 1),
      value: ODSRandom.getRandomIntInclusive(__addMinValue__, __addMaxValue__)
    };
  }

  generateModel(prev){
    super.generateModel (prev);

    // NOTE: We can do this because the answer isn't generated yet ....
    // This is TERRIBLE. TODO
    //   (this fixes the issue that the first question's dummy cid is off)
  //  if (!prev)
  //    this.setModel (this.answer.getModel ().copy ());
  }

  getParametersString()       //must overload if parameters is an object
  {
    return this.parameters.index + ", " + this.parameters.value;
  }

  computeAnswerData()
  {
  }


  // input -> valid if between __addMinParam__, __addMaxParam__
  isValidInput (input)
  {
    if (!input && input !== 0) return false;

    var int = Number (input); // NOTE: Can't use parseInt, because "3 X" is valid.
    if (!int && int !== 0) return false;

    return (int >= __addMinValue__ && int <= __addMaxValue__);
  }

  get validInputStr ()
  {
    return __addMinValue__ + " - " + __addMaxValue__;
  }

  displayAnswer (div)
  {
    super.displayAnswer.apply (this, arguments);

    var node = this.ansNode;
    var elem = node && control.find (node.id);

    if (elem)
      Animation.run ("FadeIn", elem);
  }

  canSetActive(){ return true; }

  // overload
  get ansNode(){ }
}
