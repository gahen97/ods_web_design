/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(){
    super (...arguments);
  }

  draw () {
    // This draws out the element to the screen.

    /*
          var elementDiv = $(ELEMENT_TEMPLATE).clone ();
          var model      = $(MODEL_DISPLAY);
          var span       = $("span", elementDiv);

          // set the text ...
          span.text (this.value).data ("id", this.id); // TODO There's gotta be a better way to do this

          // parent it to the main div, add the stuff, return
          elementDiv.insertAfter (model).data ("id", this.id);

          this.addControls (elementDiv, MODEL_BODY + " div");

          return elementDiv;
    */
  }

  setActive (isActive) {
      var element = $(this.element);
      if (isActive)
        element.addClass ("active");
      else
        element.removeClass ("active");
  }

  moveTo (offset) {
    $ (this.element).offset (offset);
  }


  // This adds any JQuery UI stuff (draggable, droppable, ???)
  addControls (e, stack) {
    if (!e) e = this.element;
    /*$ (e).draggable ({
      containment: "parent",
      stack: stack
    });*/
  }
}
