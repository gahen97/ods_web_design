/*jshint esversion: 6 */ 'use strict';

class AnswerTemplate extends AnswerType {
  constructor()
  {
    super();
    this.data = false;
    this.model = new __MODULENAME__();
  }

  check (userModel)
  {
    // Returns true if answer is correct, false if incorrect.
    // Given a Model
  }
}
