/*jshint esversion: 6 */

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
  display(i)
  {
    var instructionElement = $("#" + instructionsId + i);
    instructionElement.text(    instructionElement.text()
                              + this.getData()              );
  }

}
