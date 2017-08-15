/*
  This is the main Element class. It deals with creating & using Elements.

  Documentation:
    constructor()
      Constructs a new Element.

    get valueSpan () : DOMObject
      Returns the span used to represent the text of the Element.

    addControls (element : DOMObject, stack : Selector)
      Purpose: Add any other controls that the Element may need to have
                 (eg. Draggable, Sortable, JsPlumb connections)
      Arguments:
        element  DOMObject  The element div. If not given, assume this is .div
        stack    Selector   This is a JQueryUI selector that can optionally be used
                              for the stack argument. See http://api.jqueryui.com/draggable/#option-stack
      Returns: None.

  Should overload/add anything else that the Elements need to do..
*/

class Element extends ElementBase {
  constructor(){
    super (...arguments);
  }

  get span () {

  }

  // add draggable ...
  addControls (e, stack) { //make draggable
    if (!e) e = this.element;

    // add any controls the element may need
  }
}
