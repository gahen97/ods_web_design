/*jshint esversion: 6 */ 'use strict';

class GetAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  check (userAnswer) {
    return this.data === userAnswer;
  }

  findElement()
  {
    var elem = control.find (this.data)
    return elem;
  }

  display()      //TODO replace with production version
  {
    // TODO SHOULD NOT BE USING CONTROL CHANGE THIS
    var elem = this.findElement ();
    control.setActiveElement (elem);
  }
}
