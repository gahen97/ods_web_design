/*jshint esversion: 6 */ 'use strict';

class Remove extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__removeMinParam__, __removeMaxParam__);
  }

  computeAnswerData(prevAnswer){
    var myModel  = this.getModel();
    var ansModel = this.answer.getModel ();
    var aModel2  = this.answer.getM2();

    // store path for showing answer
    // if there's an actual node to remove ...
    var path  = myModel.pathTo (this.parameters);
    if (path.length>0 && path[path.length-1].data === this.parameters)
      this.answer.param ("path-to-node", path);

    ansModel.remove (this.parameters);
    aModel2.removeV2 (this.parameters); // TODO

    return ansModel;
  }


  // input: no input needed for remove
}
