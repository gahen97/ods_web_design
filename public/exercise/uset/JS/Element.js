/*jshint esversion: 6 */ 'use strict';

/*
  Element should have:
    - Making a new DOM Element to represent the element
    - Way to store value, get value, set value
    - Event handling:
      - dragstart
      - dragstop
      - click
*/

class Element {
  static nextId () {
    return Element.currentId ++;
  }

  constructor (value) {
    this.value = value;
    this.id = Element.nextId ();

    this.element = this.draw ();    //change name to generate??
    this.DomEvents = this.addEvents (); //will be moved into view

  }

  getElementDiv () { return this.element; }

  addEvents () {
    // TODO This is called when control is being constructed,
    // which ends up throwing an error ...
    // and means nothing works. so, fix this. And find a better way than this, eh?
    /*setTimeout(() => {
      // NOTE : accessing global 'control' object is bad TODO
      var event = control.getDomEventHandler (ELEM_EVENTS_ID);
      if (!event) {
        console.error ("Could not find Element events handler .... blowing up");
        return -1;
      }

      event.push (this.element);
      return 0;
    }, 10);*/
  }

  // add draggable ...
  addControls (e) { //make draggable
    if (!e) e = this.element;
    $ (e).draggable ({
      containment: "parent"
    });
  }

  // set active ... adds/removes class
  setActive (isActive) {
    var element = $(this.element);
    if (isActive)
      element.addClass ("active");
    else
      element.removeClass ("active");

  }

  // Draw the element into the DOM
  draw () {     //change name to generate?? also need to redo
    // TODO HARDCODING IS BAD. MAYBE MOVE SELECTORS TO DEFS?
    var elementDiv = $("#template > .element").clone ();
    var model      = $(".modelDisplay");
    var span       = $("span", elementDiv);

    // set the text ...
    span.text (this.value).data ("id", this.id); // TODO There's gotta be a better way to do this

    // parent it to the main div, add the stuff, return
    elementDiv.insertAfter (model).data ("id", this.id);

    this.addControls (elementDiv);

    return elementDiv;
  }

  moveTo (os) {
    $ (this.element).offset (os);
  }

  // Remove the element from the DOM
  remove () {
    $(this.element).remove ();
  }

  // getters
  getId () { return this.id; }
  getValue () { return this.value; }

  // note: 'true' value is basically an object version. parses null to null ; empty to undefined; else to itself
  getTrueValue () {
    var val = this.getValue ();
    if (!val) return;
    if (val === NULL_CHARACTER) return null;
    return val;
  }
}

Element.currentId = 1000;
