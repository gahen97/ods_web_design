/*jshint esversion: 6 */ 'use strict';

class PopBase extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive (0, this.model.size() - 1);
  }

  computeAnswerData()
  {
  }

  // input -> valid if between __addMinParam__, __addMaxParam__
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
    this.displayModel (div);

    var node = this.ansNode;
    var elem = node && control.find (node.id);

    if (elem)
      Animation.run ("FadeOut", elem, {callback:()=>{
          super.displayAnswer.apply (this, arguments);
      }});
  }

  canSetActive(){ return true; }

  // overload
  get ansNode () { return control.get (this.parameters); }
}
