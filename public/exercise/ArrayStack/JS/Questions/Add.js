/*jshint esversion: 6 */ 'use strict';

class Add extends Question {
  generateParameters()
  {
    return {
      index : ODSRandom.getRandomIntInclusive (0, this.model.size ()),
      value : ODSRandom.getRandomIntInclusive(__addMinValue__, __addMaxValue__)
    };
  }

  getParametersString () {
    return this.parameters.index + ", " + this.parameters.value;
  }

  computeAnswerData()
  {
    return this.answer.getModel().add(this.parameters.index, this.parameters.value);
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
    return __addMinParam__ + " - " + __addMaxParam__;
  }

  displayAnswer (div)
  {
    super.displayAnswer.apply (this, arguments);

    // animate adding the element
    var elem = control.findIndex (this.parameters.index);
    Animation.run ("FadeIn", elem);
  }
}
