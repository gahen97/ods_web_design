/*
  This is the base class for an Answer, which corresponds to the correct answer
    for a given question.

  Documentation:
    constructor ()
      Takes no arguments.
    param (name : string, prop : any) : any
      Purpose: Sets a miscellaneous property on the answer that can be used as
                 data from the question.
      Arguments:
        name  string  The name of the property to set
        prop  any     The value of the property to set [ OPTIONAL ]
      Returns: The value of the property.
    display (element : DOMObject)
      Purpose: Displays the answer within the given DOM Object.
      Arguments:
        element  DOMObject  The object to display the answer in
      Returns: None
    check (userAnswer : Any) : boolean
      Purpose: Checks if the given user answer is correct.
      Arguments:
        userAnswer  Any  The answer to check against
      Returns: Boolean. True if the answer is correct
*/

/*jshint esversion: 6 */ 'use strict';

class AnswerType {
  constructor()
  {
    this.data = undefined;
    this.model = undefined;

    this.misc  = { };
  }

  param (name, prop){
    if (!prop)
      return this.misc [name];

    this.misc [name] = prop;
    return prop;
  }

  setData(data)
  {
    var temp = this.data;
    this.data = data;
    return temp;
  }

  getData() { return this.data; }

  getModel(){ return this.model; }
  setModel(m) {
    var temp = this.model;
    this.model = m;
    return temp;
  }

  display(div)
  {
    this.model.draw(div);
  }

  check(userAnswer)
  {
    if (this.data.equals)   //if equals exists
    {
      return this.data.equals(userAnswer);
    }

    else
    {
      return this.data === userAnswer;
    }
  }
}
