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
    this.$elem   = $(this.element);
    this.DomEvents = this.addEvents (); //will be moved into view

    return new Proxy (this, ElementBase.proxy);
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

  // default - do nothing
  addControls (e, s) {
    return false;
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

// This is hottttt. The JS equivalent to Lua's setmetatable. Seems to be browser compatible
ElementBase.proxy = {
  get: function (target, name) {
    // basically - If you call a method here that doesn't exist, it's probably because
    //             its for elements. Something like Element.data (), which should be valid.
    //             This fixes that.
    if (name in target) return target [name];

    return contextualize (target.getElementDiv(), target.getElementDiv () [name]);
  }
}
