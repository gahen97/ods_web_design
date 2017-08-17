/*
  This controls the instructions for a question.

  Documentation:
    constructor (instructions : string)
      Creates an instructions object with the instructions set to instructions.
    display (element : DOMObject)
      Purpose: Displays the instructions inside of the given element.
      Arguments:
        element  DOMObject  The element to display the instructions in
      Returns: None
*/
/*jshint esversion: 6 */ 'use strict';

class Instructions {
  constructor(instructions)
  {
    this.data = instructions;
  }

  getData()
  {
    return this.data;
  }

  setData(newData)
  {
    var temp = this.data;
    this.data = newData;
    return temp;
  }

  //associates instruction data with html element id
  display(div)
  {
    $(div).text (this.getData ());
  }
}
