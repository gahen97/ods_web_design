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
