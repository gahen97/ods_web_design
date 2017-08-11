/*
  This has to be changed for different exercises.
  Mainly the DOM Related parts - dealing with the model display
*/

class View extends ViewBase {
  constructor(){
    super(...arguments)

    this.arrayBodyHelper = new Div ($ (ARRAY_BODY));
    this.c = 0;

    this.elementsByIndex = [ ];
  }

  // start up a new view
  start () {
    super.start.apply (this, arguments);
  }

  indexOf (element){
    return this.elementsByIndex.indexOf (element);
  }
  findAtIndex (index) {
    // TODO WE NEED AN ELEMENTS STACK
    return this.elementsByIndex [index];
  }
  insertElementAtIndex (element, index){
    this.elementsByIndex.splice (index, 0, element);
  }
  removeElementAtIndex (index){
    this.elementsByIndex.splice (index, 1);
  }

  updateIndex (prevIndex, newIndex){
    var element = this.findAtIndex (prevIndex);
    this.removeElementAtIndex (prevIndex);
    this.insertElementAtIndex (element, newIndex);
  }

  isElementOverModel () {
    return true; // stuck within the div, so yeah
  }

  // draw an element within the model
  drawWithinModel (element) {
    this.displayElement (element, this.elementsByIndex.length);
  }

  displayElement (element, index){
    var pos = this.arrayBodyHelper.fromOffset ({left: ELEMENT_X_SPACING * index + ELEMENT_X_START,
                                                top: ELEMENT_Y_OFFSET
                                              });
    element.moveTo (pos);

    this.insertElementAtIndex (element, index);
  }

  displayModel (m) {
    // We have the Array Body div ...
    // What we want is every element should be spaced at ELEMENT_X_SPACING
    // So that element 0 is at ELEMENT_X_START,
    //   element 1 is at ELEMENT_X_START + ELEMENT_X_SPACING,
    //   element 2 is at ELEMENT_X_START + ELEMENT_X_SPACING*2,
    //   etc.
    // Every element should be at ELEMENT_Y_OS from the top.
    this.clear ();
    m.each ((data,index)=>{
      var newElem = this.addElement (data, {withinModel: false});
      this.displayElement (newElem, index);
    });
  }


  addElement (...args){
    var newElem = super.addElement (...args);
    if (newElem)
      this.insertElementAtIndex (newElem, this.elementsByIndex.length);
    return newElem;
  }
}
