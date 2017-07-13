/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(){
    super (...arguments);

    // Anything else that needs to be done for Elements
    this.plumbs = [ ];
  }

  generate () {
    var elementDiv = $(ELEMENT_TEMPLATE).clone ();
    var model      = $(MODEL_DISPLAY);
    var span       = $("span", elementDiv);

    // set the text ...
    span.text (this.value).data ("id", this.id);

    // parent it to the main div, add the stuff, return
    elementDiv.insertAfter (model).data ("id", this.id);

    this.addControls (elementDiv, MODEL_BODY + " div");

    return elementDiv;
  }

  remove () {
    super.remove ();

    for (var i in this.plumbs)
      this.plumbs [i].remove ();
  }

  setActive (isActive) {
    // Activate this element. Adds a class to represent being active
      var element = $(this.element);
      if (isActive)
        element.addClass ("active");
      else
        element.removeClass ("active");
  }

  moveTo (offset) {
    // Move to some given position
    // TODO this is hacky and bad
    console.log(offset);

    $ (this.element).offset (offset);
  }

  addControls (e) {
    // If there are any controls needed - draggable, droppable, ... -
    //   add them here. If given, e is the element
    this.draggy_waggy = new JsPlumbDraggable (e);
  }

  setDraggable (t) {
    this.draggy_waggy.setDraggable (t);
  }

  addPlumb (p) {
    this.plumbs.push (p);
  }

  connectTo (otherElem, direction) {
    if (!otherElem) return false;

    var newConnection = new PlumbConnect (this.getElementDiv (),
                                          otherElem.getElementDiv (),
                                          {overlays: "arrow"}).setDirection (direction);
    this.addPlumb (newConnection);
  }
}
