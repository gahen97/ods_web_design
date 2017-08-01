/*jshint esversion: 6 */ 'use strict';

class DepthAnswer extends Answer {
  generate (targetDepth) {
    this.targetDepth = targetDepth;

    var answer = [ ];

    // We want all nodes with the given depth.
    Traversal.preorder (this.model, (data, node, details)=>{
      var depth = details.depth;
      if (depth === targetDepth)
        answer.push (node);
    });

    return answer;
  }

  get orderMatters(){ return false; }

  calculateAnswerElements () {
    return control.matchingElements ((data, node, details)=>{
      return details.depth === this.targetDepth;
    });
  }
}
