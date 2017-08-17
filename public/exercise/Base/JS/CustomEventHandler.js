/*
  The Custom Event Handler. This handles mapping of DOM Events to Control events.

  Documentation:
    constructor ()
      Takes no arguments.

    bind (odsEvent : string, handlingFunction : function, context : Any)
      Purpose: Binds the given odsEvent to the handlingFunction so it may be
                 triggered later.
      Arguments:
        odsEvent          string    Event name to bind the function to
        handlingFunction  function  Function to be triggered for the event
        context           Any       Context to provide for 'this' argument
                                      when event is triggered.

    unbind (event : string)
      Purpose: Unbinds an event, removing all event handlers.
      Arguments:
        event  string  Event name to remove all event handlers for
      Returns: None

    trigger (event : string, [...])
      Purpose: Triggers the given event, passing through all extra arguments.
      Arguments:
        event  string  Event name to trigger
         ...   Any     Extra arguments to pass through to the event
      Returns: None

*/

/*jshint esversion: 6 */ 'use strict';

class CustomEventHandler {
  constructor()
  {
    this.customEvent = { };
  }

  bind(odsEvent, handlingFunction, context)
  {
    if (!this.customEvent[odsEvent])      //if this,events doesn't contain event
    {
      this.customEvent[odsEvent] = [];
    }
    this.customEvent[odsEvent].push({
      func: handlingFunction,
      context: context
    });
  }

  unbind(event)
  {
    this.customEvent[event] = [ ];
  }

  trigger(event, ...args)
  {
    var doThis = this.customEvent[event];
    if (doThis)
    {
      for (var i = 0; i < doThis.length; i++) {
        doThis[i].func.apply(doThis[i].context, args);
      }
    }
  }
}
