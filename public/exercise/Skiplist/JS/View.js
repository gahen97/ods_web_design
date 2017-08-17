/*
  This is the main View class which will be used for dealing with all UI elements.

  Documentation:
    constructor ()
      Constructs a new View object.
    isElementOverModel (element : DOMObject) : boolean
      Purpose: Determines if an element is within the model's view.
      Arguments:
        element  DOMObject  The DOM Object to check
      Returns: Boolean. True if the element is within the model.
    drawWithinModel (element : Element)
      Purpose: Draws an element within the model's view.
      Arguments:
        element  Element  The element to draw within the model.
      Returns: None
    displayModel (m : Model)
      Purpose: Draws the model to the screen.
      Arguments:
        m  Model  The model to display
      Returns: None

  See ViewBase for further documentation
*/

class View extends ViewBase {
  constructor(){
    super(...arguments);
  }

  // Is an element in the model
  isElementOverModel (element) {
    // NTS: Element here is the div
    return this.modelDivHelper.elementOver (element);
  }

  // draw an element within the model
  drawWithinModel (element) {
    var pos = this.modelDivHelper.randomPosition ();
    element.moveTo (pos);
  }

  displayModel (m) {
  }
}
