/*jshint esversion: 6 */ 'use strict';

class Remove extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__removeMinParam__, __removeMaxParam__);
  }

  computeAnswerData(prevAnswer)
  {
    return this.answer.getModel().remove(this.parameters);
  }

  displayAnswer (div)
  {
    // otherwise show it being added
    var elem = control.find (this.parameters);
    if (!elem) return;

    Animation.run ("FadeOut", elem.jq,
      {
        callback: ()=>{
          super.displayAnswer.apply (this, arguments);
        }
      }
    )
  }
  // input: no input needed for remove
}
