/*jshint esversion: 6 */ 'use strict';

class AnswerTemplate extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
  }

  check (userAnswer)
  {
    // Returns true if answer is correct, false if incorrect.
    // Given an AnswerType
    //return this.model.equals (userAnswer);
  }
}
