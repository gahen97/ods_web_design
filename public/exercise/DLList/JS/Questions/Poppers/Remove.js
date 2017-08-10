/*jshint esversion: 6 */ 'use strict';

class Remove extends PopBase {
  computeAnswerData()
  {
    return this.answer.getModel().remove(this.parameters);
  }
}
