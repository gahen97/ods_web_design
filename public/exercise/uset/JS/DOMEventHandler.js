/*jshint esversion: 6 */ 'use strict';

/*
  This is pretty interesting. You can give events namespaces.
  For example .... If there's a div that has three click handlers, but the three
    should be separate - you can give them different namespaces.
  Then if you stop one by the .off () method, the others are still there.
  TODO We should use this.

  http://api.jquery.com/off/
    ctrl + f 'namespace'
  Ex. click.DOMEventHandler12315
*/

class DOMEventHandler {   //we have one instance of a domeventhandler for each dom element that has events associated with it
  static registerEventHandler (h) {
    this.customEventHandlers.push (h);
  }

  constructor (elements, triggerMap) {        //usual use case is new DOMEventHandler([], {"DOMEventSymbol" : "CustomEventSymbol"}
    // {click : "check"}
    //trigger map is a custom object, that has keys as dom events, and values as bound names of custom emitted events that are registered in EH
    //the final handling functions are "bound" in the custom event handler.
    //The reason we have this structure is that we could want to have events that are not triggered by DOM.
    this.triggerMap = triggerMap;
    this.elements = elements;
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

  // TODO name?
  remove (element) {
    var e = this.elements.indexOf (element);
    if (e !== -1) this.elements.splice (e, 1);
    else { console.error ("could not find : ", e); }
  }

  // TODO - not really todo but anyway.
  // Changed the name here. It's not adding triggers, it's adding
  //   elements that will be recorded for the trigger.
  addTriggerElement (element) {
    var $e = $(element);
    for (var domEvent in this.triggerMap) {
          $e.on (domEvent, (...args)=>{     //handling function
            this.fire.apply (this, args);
          });
    }
  }

  // remove an element from the trigger elements.
  removeTriggerElement (element) {
    var $e = $ (element);
    for (var domEvent in this.triggerMap) {
      $e.off (domEvent); // no longer fires
    }
  }

  fire (event, ...args) {
    var events = DOMEventHandler.customEventHandlers;
    var type   = this.triggerMap [event.type];
    var elem   = event.target;

    // TODO: better way to do this?
    args.unshift (event);
    args.unshift (elem);
    args.unshift (type);

    for (var i in events)
      events[i].trigger.apply (events[i], args);
  }

}

DOMEventHandler.customEventHandlers = [ ];
