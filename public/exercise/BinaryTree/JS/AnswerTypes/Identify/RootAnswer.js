/*jshint esversion: 6 */ 'use strict';

class RootAnswer extends Answer {
  generate () {
    var answer = [ ];

    // We want all nodes with the given depth.
    answer.push (this.model.root);

    return answer;
  }

  calculateAnswerElements(){ console.log(control.getRoot()); return control.getRoot(); }
}
