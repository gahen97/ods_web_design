/*jshint esversion: 6 */ 'use strict';

class Remove extends Question {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__removeMinParam__, __removeMaxParam__);
  }

  computeAnswerData(prevAnswer){
    var model = this.answer.getModel();

    // store path for showing answer
    // if there's an actual node to remove ...
    var path  = model.pathTo (this.parameters);
    if (path.length>0 && path[path.length-1].data === this.parameters)
      this.answer.param ("path-to-node", path);

    model.remove (this.parameters);
    return model;
  }


  // input: no input needed for remove
}
