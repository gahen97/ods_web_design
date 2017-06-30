
/*jshint esversion: 6 */ 'use strict';
/* Hey I'm back */

class View {
  constructor() {
    this.eventHandlers = [ ];
    this.eventsById    = { };
      // this maps DomEventHandlers by ID : Handler. This is only added to when
      // id is specified.

    this.elements = { };
    this.elementsByValue = { };

    this.modelDivHelper = new Div ($("#model")); // #TODO
  }

  /* ---- START - ADD THE NULL ELEMENT ---- */
  start()
  {
    this.addElement (NULL_CHARACTER, {withinModel: true});
  }

  /* ---- CLEAR THE MODEL ---- */
  clear ()
  {
    for (var key in this.elements)
      if (this.elements [key].getValue() !== NULL_CHARACTER)
        this.removeElementById (key);

    // that's probably it for the waffle king. bye all :/
  }
  /* ---- EVENT HANDLERS ---- */
  register (eh)
  {
    DOMEventHandler.registerEventHandler (eh);
  }

  addDOMEvent (event) {
    var triggerMap = { };

    var currData = null;

    for (var evt in event.evtsArr)
    {
      currData = event.evtsArr[evt];
      triggerMap[currData.domEvtName] = currData.customEvtName;
    }

    var newHandler = new DOMEventHandler (event.elem, triggerMap);
    this.eventHandlers.push (newHandler);

    // Handlers by ID
    if (event.id)
      this.eventsById[event.id] = newHandler;
  }

  getEventHandler (id) {
    return this.eventsById [id];
  }

  /* ---- ELEMENTS ----- */

  // add a new element
  addElement (value, options) {
    if (!options) options={};

    // add the element & push it into the elements object
    var newElement                                = new Element (value);
    this.elements [newElement.getId ()]           = newElement;
    this.elementsByValue [newElement.getValue ()] = newElement;

    if (options.withinModel)
      this.drawWithinModel (newElement);

    if (options.events !== false) {
      // TODO moved this into here.
      var e = this.getEventHandler (ELEM_EVENTS_ID);
      if (e) e.push (newElement.getElementDiv ());
    }
  }

  // remove an element
  removeElementById (id) {
    var element = this.elements [id];
    if (!element) return false;

    delete this.elementsByValue [element.getValue()];
    delete this.elements[id];

    // NTS, if the element exists within the elements event handler,
    //  we should probably remove it. TODO
    var e = this.getEventHandler (ELEM_EVENTS_ID);
    if (e) e.remove (element.getElementDiv ());

    element.remove ();

    return element;
  }

  removeElement (elem) {
    var id = $(elem).data ("id");
    return this.removeElementById (id);
  }

  // get an element
  getElementById (id) {
    return this.elements [id];
  }

  getElement (e) {
    var id = $(e).data ("id");
    return this.getElementById (id);
  }

  getValueFromElementDiv (e) {
    var elem = this.getElement (e);
    return elem && elem.getValue ();
  }

  // find an element
  findByValue (value)
  {
    return this.elementsByValue [value];
  }

  // draw an element within the model
  drawWithinModel (element) {
    var pos = this.modelDivHelper.randomPosition ();
    element.moveTo (pos);
  }

  // is element over top of the model?
  isElementOverModel (element) {
    // NTS: Element here is the div
    return this.modelDivHelper.elementOver (element);
  }

  // set active element
  setActive (element) {
    if (this.activeElement)
      this.activeElement.setActive (false);

    this.activeElement = element;
    if (element) element.setActive (true);
  }


  /* ---- MODELS ------ */
  displayModel (m) {
    // TODO Remove any elements that should not be shown
    for (var k in this.elements){
      var value = this.elements [k].getValue ();
      if (value !== NULL_CHARACTER && !m.contains (value))
        this.removeElementById (k);
    }

    m.each ((element) => {
      if (!this.findByValue (element))
        this.addElement (element, {withinModel: true});
    });
  }
}
