/*jshint esversion: 6 */ 'use strict';

/*
  Updated. Now uses namespaces so we can identify the events added by different
    DOMEventHandlers. Still, the only thing I'm certain of is that if you use
    three unicorns to get into a fantasy land filled with bunny rabbits and little
    kittens, you're having a good day
*/

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
    this.setup ();
  }

  setup () {
    $(this.elements).each ((index, element) => {
      this.addTriggerElement (element);
    });
  }

  push (element) {
    this.elements.push (element);
    this.addTriggerElement (element);
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
  }

  addTriggerElement (element) {
    var $e = $(element);
    for (var domEvent in this.triggerMap) {
          $e.on (domEvent + this.namespace, (...args)=>{     //handling function
            this.fire.apply (this, args);
          });
    }
  }

  // remove an element from the trigger elements.
  removeTriggerElement (element) {
    $ (element).off (this.namespace);
  }

  fire (event, ...args) {
    var events = DOMEventHandler.customEventHandlers;
    var type   = this.triggerMap [event.type];
    var elem   = event.target;

        args   = [type, elem, event].concat (args);

    for (var i in events)
      events[i].trigger.apply (events[i], args);
  }

}

DOMEventHandler.customEventHandlers = [ ];
DOMEventHandler.id = 9610203;
