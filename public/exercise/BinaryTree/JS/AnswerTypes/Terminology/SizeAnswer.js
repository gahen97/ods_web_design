/*jshint esversion: 6 */ 'use strict';

class SizeAnswer extends Answer {
  generate (target) {
    this.target = target;

    var answer = [ ];

    // We want all nodes with the given depth.
    this.model.calculateSizes ();
    Traversal.preorder (this.model, (data, node, details)=>{
      var size = node.size;
      if (size === target)
        answer.push (node);
    });

    return answer;
  }

  get orderMatters(){ return false; }

  calculateAnswerElements () {
    control.model.calculateSizes ();
    return control.matchingElements ((data, node, details)=>{
      return node.size === this.target;
    });
  }
}
