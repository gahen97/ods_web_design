/*jshint esversion: 6 */ 'use strict';

class PopBase extends Question {
  generateParameters()
  {
    return null;
  }

  computeAnswerData()
  {
  }

  get fullName () { return this.name; }
  get exerciseName () { return this.name + "()"; }
  
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
  get ansNode () { return control.head; }
}
