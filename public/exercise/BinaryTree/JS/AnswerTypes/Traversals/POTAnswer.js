/*jshint esversion: 6 */ 'use strict';

class POTAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  generate () {
    var answer = [ ];
    Traversal.postorder (this.model, (d,n)=>{
      answer.push(n);
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

    var elements = control.traverse (Traversal.postorder);
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
