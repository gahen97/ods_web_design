/*
  This is the base object for any Elements that get added. These have a value &
    are overloaded to work for the needs of any given exercise.

  Documentation:
    NOTE: MUST OVERLOAD:
      get valueSpan () : DOMObject { };
        Returns the value span from the element. eg., $("span", elementDiv);


    constructor (value : Any, ...)
      Arguments:
        value  Any  Whatever value the element should have for the exercise.
        ...    Any  Any extra arguments to be used for generating elements.

    getElementDiv() : DOMObject
      Returns: The element DOM Object.

    divToNext (next : Element) : DOMObject
      Purpose: Used for the traverse animation to generate a path.
      Arguments:
        next  Element  The next element in the sequence.
      Returns: DOMObject representing the object to use for the next path.
      NOTE: By default, returns the div itself. If your exercise uses a different
            path (see BST, for example), this must be overloaded.

    addControls (element : DOMObject, stack : Selector)
      Purpose: Adds any other controls the element may need
                 (eg. Draggable, Sortable, JsPlumb connections)
      Arguments:
        element  DOMObject  The element div. If not given, assume this is .div
        stack    Selector   This is a JQueryUI selector that can optionally be used
                              for the stack argument. See http://api.jqueryui.com/draggable/#option-stack
      Returns: None.

    setActive (isActive : boolean)
      Purpose: Sets/Resets the element as being active (eg., to add a css class).
      Arguments:
        isActive  boolean  Determines whether the element should be active.
                             If this is false, means to remove effects of having
                             been active.
      Returns: None

    generate () : DOMObject
      Purpose: Creates the main DOMObject to be used for the element.
      Arguments: None
      Returns: DOMObject representing the element

    moveTo (offset : Offset)
      Purpose: Move the element to a given offset on the screen.
      Arguments:
        offset  Offset  The offset ({top: Y, left: X}) to move the element to.
      Returns: None

    remove ()
      Purpose: Removes the element.
      Arguments: None
      Returns: None

    getId () : int
      Returns the id of the element
    getValue () : Any
      Returns the value of the element
    getObjValue () : Any
      Purpose: Convert the element value to its closest object representation.
      Arguments: None
      Returns: An objectified form of the value:
        If undefined, returns undefined;
        If NULL_CHARACTER (see defs), returns null;
        Else returns the regular value.

    Properties:
      .div  DOMObject     The element div
      .jq   JQueryObject  The JQuery Object for the element

    NOTE: This has a built-in proxy, meaning any JQuery methods can be run
            on the element. For example, Element.addClass("class") is valid
            and will be called on the JQuery object.
*/

/*jshint esversion: 6 */ 'use strict';

class ElementBase {
  static nextId () {
    return ElementBase.currentId ++;
  }

  constructor (value, ...args) {
    this.value = value;
    this.id = ElementBase.nextId ();

    this.element = this.generate (...args);
    this.$elem   = $(this.element);

    // NOTE: This sets up the Proxy that points any DOM methods called on the element
    //       to the DOM object
    return new Proxy (this, ElementBase.proxy);
  }

  getElementDiv () { return this.element; }
  get div () { return this.getElementDiv(); }

  // this is used by the traverse animation. it will jump to the given div's position
  // when the next step is to move to d2.
  divToNext (d2){ return this.element; }


  // default - do nothing
  addControls (element, stack) {
    return false;
  }

  // set active ... adds/removes class
  setActive (isActive) {
    this.jq.toggleClass ("active", isActive);
  }

  // Draw the element into the DOM
  generate () {
    var elementDiv = $(ELEMENT_TEMPLATE).clone ();
    var model      = $(MODEL_DISPLAY);
    var span       = this.span ();

    // set the text ...
    span.text (this.value).data ("id", this.id);

    // parent it to the main div, add the stuff, return
    elementDiv.insertAfter (model).data ("id", this.id);

    this.addControls (elementDiv);

    return elementDiv;
  }

  moveTo (os) {
    $ (this.element).offset (offset);
    return true;
  }

  // Remove the element from the DOM
  remove () {
    $(this.element).remove ();
  }

  get jq () { return $(this.getElementDiv()); }

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

    return contextualize (target.jq, target.jq [name]);
  }
}
