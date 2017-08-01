/*jshint esversion: 6 */ 'use strict';

class IdentityAnswer extends Answer {
  generate () {
    var answer = [ ];

    // We want all nodes with the given depth.
    Traversal.preorder (this.model, (data, node, details)=>{
      if (this.include (data, node, details))
        answer.push (node);
    });

    return answer;
  }

  get orderMatters(){ return false; }

  calculateAnswerElements(){
    return control.matchingElements ((data, node, details)=>{
      return (this.include (data, node, details));
    });
  }
}
