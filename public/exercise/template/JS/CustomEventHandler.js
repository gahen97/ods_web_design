/*jshint esversion: 6 */

class CustomEventHandler {
  constructor()
  {
    this.customEvent = { };
  }

  bind(odsEvent, handlingFunction)
  {
    if (!this.customEvent[odsEvent])      //if this,events doesn't contain event
    {
      this.customEvent[odsEvent] = []
    }
    this.customEvent[odsEvent].push(handlingFunction);
  }

  unbind(event)
  {
    this.customEvent[event] = [ ];
  }

  trigger(event)
  {
    var doThis = this.customEvent[event]
    if (doThis)
    {
      for (var i = 0; i < doThis.length; i++) {
        Array.prototype.shift.apply(arguments);         //removing the first element of arguments, which is the event itself (original target)
        doThis[i].apply(this, arguments);
      }
    }
  }
}
