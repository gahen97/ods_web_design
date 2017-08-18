/*jshint esversion: 6 */ 'use strict';

class Pop extends PopBase {
  computeAnswerData()
  {
    return this.answer.getModel().pop();
  }
}
