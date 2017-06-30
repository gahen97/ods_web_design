/*jshint esversion: 6 */

class DOMEventHandler {
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
      this.addTriggerToMap (element);
    });
  }

  push (element) {
    this.elements.push (element);
    this.addTriggerToMap (element);
  }

  addTriggerToMap (element) {
    var $e = $(element);
    for (var domEvent in this.triggerMap) {
          $e.on (domEvent, (event)=>{     //handling function
            this.fire.call (this, event);
          });
    }
  }

  fire (event) {
    var events = DOMEventHandler.customEventHandlers;
    var type   = this.triggerMap [event.type];
    var elem   = event.target;

    for (var i in events)
      events[i].trigger (type, elem, event);
    }

}

DOMEventHandler.customEventHandlers = [ ];
