
/*jshint esversion: 6 */ 'use strict';
const VIEW_CODE_ALL = "View.Code.All";

class ViewBase {
  constructor() {
    this.eventHandlers = [ ];
    this.eventsById    = { };
      // this maps DomEventHandlers by ID : Handler. This is only added to when
      // id is specified.

    this.elements = { };
    this.elementsByValue = { };

    this.modelDivHelper = new Div ($ (MODEL_MAIN));
    this.modelBodHelper = new Div ($ (MODEL_BODY));

    this.overlay = new Overlay ($ (QUESTION_MAIN));
  }

  /* ---- START ---- */
  start()
  {
    this.clear ();
  }

  /* ---- DISABLE / ENABLE MOUSE EVENTS ----- */
  disable ()
  {
    this.overlay.disable ();
  }
  enable ()
  {
    this.overlay.enable ();
  }

  /* ---- CLEAR THE MODEL ---- */
  clear (opts)
  {
    if (!opts)opts={};
    for (var key in this.elements)
      if (!opts.checkFunc || opts.checkFunc (this.elements [key]))
        this.removeElementById (key);
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

  addToEventHandler (element, id) {
    var e = this.getEventHandler (id);
    if (e) e.push (element);
  }
  /* ---- ELEMENTS ----- */

  // add a new element
  addElement (value, options) {
    if (!options) options={};

    // add the element & push it into the elements object
    var newElement                                = new Element (value, options.constructArgs);
    this.elements [newElement.getId ()]           = newElement;

    if (!this.elementsByValue [value])
      this.elementsByValue[value] = [ ];
    this.elementsByValue [value].push (newElement);

    if (options.withinModel)
      this.drawWithinModel (newElement, options.data);

    if (options.events !== false) {
      // Moved this into here. Now Element doesn't need to access Control, which it shouldn't
      this.addToEventHandler (newElement.getElementDiv (), ELEM_EVENTS_ID);
    }

    this.storePositionOf (newElement);

    return newElement;
  }

  // remove an element
  removeElementById (id) {
    var element = this.elements [id];
    if (!element) return false;

    //delete this.elementsByValue [element.getValue()];
    delete this.elements[id];

    // remove the element from the by value array
    var eles = this.elementsByValue [element.getValue ()];
    var indx = eles && eles.indexOf (element);
    if (indx !== -1)
      eles.splice (indx, 1);

    // Remove the element from our event handler - if we remove it, it shouldn't be connected
    //   to our event handling
    var e = this.getEventHandler (ELEM_EVENTS_ID);
    if (e) e.remove (element.getElementDiv ());

    element.remove ();

    return element;
  }

  removeElement (elem) {
    var id = $(elem).data ("id");
    return this.removeElementById (id);
  }

  removeElements (elems, checkFunc) {
    for (var i in elems) {
      var e = elems [i];
      if (!checkFunc || checkFunc (e))
        this.removeElementById (e.getId ());
    }
  }

  /*removeElementByValue (value) {
    var element = this.elementsByValue [value];
    if (!element) return false;

    var id      = element.getId ();
    return this.removeElementById (id);
  }*/

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

  findOneWithValue (value)
  {
    var e = this.findByValue (value);
    return e && e[0];
  }

  // conatins an element with given value
  contains (value)
  {
    var v = this.elementsByValue[value];
    return v && v.length>0;
  }

  // check if an element is in the set
  checkInSet (elements) {
    var result = false;

    $ (elements).each ((i, e) => {
      if (this.modelDivHelper.elementOver (e.getElementDiv ())){
        result = true;
        return false;
      }
    });

    return result;
  }

  valueInSet (value){
    var elements = this.findByValue (value);
    return this.checkInSet (elements);
  }

  drawWithinModel (element) {
    // Think of this as being abstract
    console.error ("drawWithinModel using ViewBase implementation. This should be overloaded");
    return false;
  }

  // is element over top of the model?
  isElementOverModel (elementDiv) {
    // This should be overloaded in any View subclass.
    // Think of this as being abstract
    console.error ("isElementOverModel should be overloaded");
    return false;
  }

  // set active element
  setActive (element) {
    if (this.activeElement)
      this.activeElement.setActive (false);

    this.activeElement = element;
    if (element) element.setActive (true);
  }

  /* ----- ANIMS ----- */
  runAnimations(){
  };

  /* ---- MODELS ------ */
  displayModel (m) {
    return null;
  }


  resizeModel ()
  {
    this.modelDivHelper.fixHeight ();
  }

  storePositions ()
  {
    this.modelBodHelper.storePositions (this.elements);
  }

  storePositionOf (e)
  {
    this.modelBodHelper.storePosition (e);
  }

  fixPositions ()
  {
    this.modelBodHelper.fixPositions (this.elements);
  }
}
