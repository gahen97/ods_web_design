/*jshint esversion: 6 */ 'use strict';

class RemoveAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = null;
    this.model = new __MODULENAME__();
  }

  check (userAnswer)
  {
    return this.model.equals (userAnswer);
  }
}
