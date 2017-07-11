/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(){
    super (...arguments);

    // Anything else that needs to be done for Elements
  }

  generate () {
    // Create a new div to represent the element,
    //   returning the new div
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
    $ (this.element).offset (offset);
  }

  addControls (e) {
    // If there are any controls needed - draggable, droppable, ... -
    //   add them here. If given, e is the element
  }
}
