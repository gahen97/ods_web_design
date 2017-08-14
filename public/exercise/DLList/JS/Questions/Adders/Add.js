/*jshint esversion: 6 */ 'use strict';

class Add extends AddBase {
  computeAnswerData()
  {
    return this.answer.getModel().add(this.parameters.index, this.parameters.value);
  }

  get ansNode () { return control.get (this.parameters.index); }
}
