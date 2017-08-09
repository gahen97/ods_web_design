/*jshint esversion: 6 */ 'use strict';

class FindAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
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

    var elements = control.getElementsForRoute (this.data); // TODO implement
    if (!elements) return false;

    // TODO should be something better here maybe
    control.reset ();

    Animation.run ("Traverse", elements, {
      callback: ()=>{
        control.enable ();
      },
      each: (elem)=>{
        console.log(control.disabled);
        if (!control.disabled)
          return false;
        control.setActiveElement (elem);
      }
    });
  }
}
