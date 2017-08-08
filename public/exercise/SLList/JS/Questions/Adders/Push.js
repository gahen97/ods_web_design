/*jshint esversion: 6 */ 'use strict';

class Push extends AddBase {
  computeAnswerData()
  {
    return this.answer.getModel().push(this.parameters);
  }

  get ansNode () { return control.head; }
}
