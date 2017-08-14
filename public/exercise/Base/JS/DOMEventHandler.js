/*
  DOM Event Handler. Handles dealing with DOM Events.
    When a DOM Event occurs, this will redirect the event through
    to our CustomEventHandler based on our triggerMap.

  Hello.
  Hello, again.

  Documentation:
    constructor (elements : Variant, triggerMap : Object)
      Arguments:
        elements    Variant  Elements to react to DOM Events on
        triggerMap  Object   Map of DOMEvent : CustomEvent
      NOTE:
        elements can be any of:
          Jquery Object
          Empty Array
          Array of DOM Elements
          Single DOM Element
        triggerMap should be in the format
          {domEvent : customEvent}
          Ex. {click : "custom-click"}

    push (element : DOMObject)
      Purpose: Adds a new element as a trigger for the DOM Events.
      Arguments:
        element  DOM Object  Element to react to DOM Events on
      Returns: None

    pushArray (elements : Array of DOM Object)
      Purpose: Pushes all elements from given array as triggers.
      Arguments:
        elements  Array  Array of elements to use as triggers for DOM Events
      Returns: None

    remove (element : DOMObject)
      Purpose: Removes an element from the triggers, stopping all DOM connections.
      Arguments:
        element  DOM Object  Element to stop reacting to DOM Events of
      Returns: None

  CALLED FROM STATIC CONTEXT
    registerEventHandler (h : CustomEventHandler)
      Purpose: Registers a custom event handler to react to events on.
      Arguments:
        h  CustomEventHandler  Event handler to fire to when reacting to events
      Returns: None

*/

/*jshint esversion: 6 */ 'use strict';

class DOMEventHandler {   //we have one instance of a domeventhandler for each dom element that has events associated with it
  static registerEventHandler (h) {
    this.customEventHandlers.push (h);
  }

  static nextId () { return DOMEventHandler.id ++; }

  constructor (elements, triggerMap) {        //usual use case is new DOMEventHandler([], {"DOMEventSymbol" : "CustomEventSymbol"}
    // {click : "check"}
    //trigger map is a custom object, that has keys as dom events, and values as bound names of custom emitted events that are registered in EH
    //the final handling functions are "bound" in the custom event handler.
    //The reason we have this structure is that we could want to have events that are not triggered by DOM.
    this.triggerMap = triggerMap;
    this.elements = elements;
    this.id       = DOMEventHandler.nextId (); // for namespacing

    this.namespace = "." + this.id;
    this._setup ();
  }

  /* --- HIDDEN / PRIVATE --- */
  _addTriggerElement (element) {
    var $e = (element && element.bind) ? element : $(element);

    for (let domEvent in this.triggerMap) {
          $e.bind (domEvent, (...args)=>{     //handling function
            args = [domEvent].concat(args);
            this._fire.apply (this, args);
          });
    }
  }

  // remove an element from the trigger elements.
  _removeTriggerElement (element) {
    $ (element).off (this.namespace);
  }

  _setup () {
    $(this.elements).each ((index, element) => {
      this._addTriggerElement (element);
    });
  }

  _fire (type, event, ...args) {
    var events = DOMEventHandler.customEventHandlers;
    var type   = this.triggerMap [type];
    var elem   = event.target;

        args   = [type, elem, event].concat (args);

    for (var i in events)
      events[i].trigger.apply (events[i], args);
  }

  /* ---- PUBLIC ---- */
  push (element) {
    this.elements.push (element);
    this._addTriggerElement (element);
  }

  pushArray (arr) {
    for (var i in arr)
      this.push (arr[i]);
  }

  // TODO name?
  remove (element) {
    var e = this.elements.indexOf (element);
    if (e !== -1) this.elements.splice (e, 1);
    else { console.error ("could not find : ", e); }

    this._removeTriggerElement (element);
  }

}

DOMEventHandler.customEventHandlers = [ ];
DOMEventHandler.id = 1729;
