/*jshint esversion: 6 */ 'use strict';

class DepthAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

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

  check (userAnswer) {
    // if not given an answer, is wrong.
    if (!userAnswer) return false;

    // if not enough / too many nodes in answer, is wrong.
    if (userAnswer.length !== this.data.length) return false;

    // every node must match ...
    for (var i in this.data) {
      if (!userAnswer [i]) return false;
      if (this.data [i].data !== userAnswer [i].data) return false;
    }

    return true;
  }

  display()      //TODO replace with production version
  {
    control.disable ();

    // TODO should be something better here maybe
    control.reset ();

    var elements = control.matchingElements ((data, node, details)=>{
      return details.depth === this.targetDepth;
    });
    Animation.run ("Traverse", elements, {
      callback: ()=>{
        control.enable ();
      },
      each: (elem)=>{
        control.setActiveElement (elem);
      }
    });
  }
}
