/*jshint esversion: 6 */ 'use strict';

class FindAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  check (userAnswer) {
    return this.data === userAnswer;
  }

  display()      //TODO replace with production version
  {
    // TODO SHOULD NOT BE USING CONTROL CHANGE THIS
    var elem = control.find (this.data)
    if (!elem)
      elem = control.find (NULL_CHARACTER);

    control.setActiveElement (elem);
  }
}
