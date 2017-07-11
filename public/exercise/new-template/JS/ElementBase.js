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

    this.element = this.generate ();
    this.$elem   = $(this.element);

    // NOTE: This sets up the Proxy that points any DOM methods called on the element
    //       to the DOM object
    return new Proxy (this, ElementBase.proxy);
  }

  getElementDiv () { return this.element; }

  // default - do nothing
  addControls (e, s) {
    return false;
  }

  // set active ... adds/removes class
  setActive (isActive) {
    return null;
  }

  // Draw the element into the DOM
  generate () {
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

  // Converts to the object version of the value => NULL is null, UNDEFINED undefined, otherwise itself
  getObjValue () {
    var val = this.getValue ();
    if (!val) return;
    if (val === NULL_CHARACTER) return null;
    return val;
  }
}

ElementBase.currentId = 1000;

// Proxies. These work similar to Metatables in Lua;
// Basically, if a property is looked for that doesn't exist, you can send it
//   something else instead - in this case, we're sending the same property from the
//   DOM element
ElementBase.proxy = {
  get: function (target, name) {
    // basically - If you call a method here that doesn't exist, it's probably because
    //             its for elements. Something like Element.data (), which should be valid.
    //             This fixes that.
    if (name in target) return target [name];

    return contextualize (target.getElementDiv(), target.getElementDiv () [name]);
  }
}
