/*jshint esversion: 6 */ 'use strict';

class Remove extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__removeMinParam__, __removeMaxParam__);
  }

  computeAnswerData(prevAnswer)
  {
    if (DEBUG){
      console.log ("I am a fox. I have ", this.parameters, " as parameters.");
      console.log ("My model to start with is ", this.getModel ().toString ());
    }
    var model = this.answer.getModel();
    model.remove(this.parameters);
    if (DEBUG) console.log ("My answer is ", model.toString ())
    return model;
  }


  // input: no input needed for remove
}
