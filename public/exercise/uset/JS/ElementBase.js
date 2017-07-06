/*jshint esversion: 6 */ 'use strict';

/*
  Element should have:
    - Making a new DOM Element to represent the element
    - Way to store value, get value, set value
    - Event handling:
      - dragstart
      - dragstop
      - click

  This implements the methods that likely won't change between exercises.
*/

class ElementBase {
  static nextId () {
    return ElementBase.currentId ++;
  }

  constructor (value) {
    this.value = value;
    this.id = ElementBase.nextId ();

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
  addControls (e, stack) { //make draggable
    if (!e) e = this.element;
    $ (e).draggable ({
      containment: "parent",
      stack: stack
    });
  }

  // set active ... adds/removes class
  setActive (isActive) {
    return null;
  }

  // Draw the element into the DOM
  draw () {     //change name to generate?? also need to redo
    return null;
  }

  moveTo (os) {
    return false;
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

ElementBase.currentId = 1000;
