/*jshint esversion: 6 */ 'use strict';
// Pre-Overtime Answer
class TraversalBase extends Answer {
  generate(){
    var traverse = this.traversalMethod;

    var answer   = [ ];
    traverse (this.model, (data, node)=>{
      answer.push (node);
    });

    return answer;
  }

  get orderMatters(){ return this.sort; }
  
  calculateAnswerElements () {
    return control.traverse(this.traversalMethod);
  }

  get traversalMethod(){
    return function(){ return null; }
  }
}
