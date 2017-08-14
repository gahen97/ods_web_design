/*jshint esversion: 6 */ 'use strict';

class BlankAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
  }

  check (userAnswer)
  {
    return true;
  }

  display(div){
    super.display(div);
  }
}
