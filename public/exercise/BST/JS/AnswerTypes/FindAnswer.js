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
    var elem = control.find (this.data)
    if (!elem)
      elem = control.find (NULL_CHARACTER);

    if (elem) control.setActiveElement (elem);
  }
}
