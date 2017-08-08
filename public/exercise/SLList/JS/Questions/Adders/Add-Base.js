/*jshint esversion: 6 */ 'use strict';

class AddBase extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__addMinParam__, __addMaxParam__);
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

    return (int >= __addMinParam__ && int <= __addMaxParam__);
  }

  get validInputStr ()
  {
    return __addMinParam__ + " - " + __addMaxParam__;
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
