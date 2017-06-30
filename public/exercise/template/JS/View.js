/*jshint esversion: 6 */

class View {
  constructor(eventHandler)
  {
    this.events = new Object{ };
    this.customEventHandler = eventHandler;
  }

  bindEvent(event, handler)
  {
    $element.onEvent()
    this.events[event] = handler;
  }
}
