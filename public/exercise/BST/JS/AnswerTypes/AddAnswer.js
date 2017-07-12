/*jshint esversion: 6 */ 'use strict';

class AddAnswer extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
    console.log ("I GOTZ A MODEL ", this.model)
  }

  check (userAnswer)
  {
    return this.model.equals (userAnswer);
  }
}
