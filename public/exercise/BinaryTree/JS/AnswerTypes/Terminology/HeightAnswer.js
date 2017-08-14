/*jshint esversion: 6 */ 'use strict';

class HeightAnswer extends Answer {
  generate (target) {
    this.target = target;

    var answer = [ ];

    // We want all nodes with the given depth.
    this.model.calculateHeights ();
    Traversal.preorder (this.model, (data, node, details)=>{
      var height = node.height;
      if (height === target)
        answer.push (node);
    });

    return answer;
  }

  get orderMatters(){ return false; }

  calculateAnswerElements () {
    control.model.calculateHeights ();
    return control.matchingElements ((data, node, details)=>{
      return node.height === this.target;
    });
  }
}
