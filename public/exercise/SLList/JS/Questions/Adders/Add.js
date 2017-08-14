/*jshint esversion: 6 */ 'use strict';

class Add extends AddBase {
  computeAnswerData()
  {
    return this.answer.getModel().add(this.parameters);
  }

  get ansNode () { return control.tail; }
}
