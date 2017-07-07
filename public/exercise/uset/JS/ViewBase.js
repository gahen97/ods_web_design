
/*jshint esversion: 6 */ 'use strict';
/* Hey I'm back */
const VIEW_CODE_ALL = "delete them all noober";

class ViewBase {
  constructor() {
    this.eventHandlers = [ ];
    this.eventsById    = { };
      // this maps DomEventHandlers by ID : Handler. This is only added to when
      // id is specified.

    this.elements = { };
    this.elementsByValue = { };

    this.modelDivHelper = new Div ($ (MODEL_MAIN)); // #TODO
    this.modelBodHelper = new Div ($ (MODEL_BODY)); // #TODO
  }

  /* ---- START - ADD THE NULL ELEMENT ---- */
  start()
  {
    this.clear ({null: false});
    this.addElement (NULL_CHARACTER, {withinModel: true});
  }

  /* ---- CLEAR THE MODEL ---- */
  clear (opts)
  {
    if (!opts)opts={};
    for (var key in this.elements)
      if (opts.null===false || this.elements [key].getValue() !== NULL_CHARACTER)
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

  /* ---- ELEMENTS ----- */

  // add a new element
  addElement (value, options) {
    if (!options) options={};

    // add the element & push it into the elements object
    var newElement                                = new Element (value);
    this.elements [newElement.getId ()]           = newElement;

    if (!this.elementsByValue [value])
      this.elementsByValue[value] = [ ];
    this.elementsByValue [value].push (newElement);

    if (options.withinModel)
      this.drawWithinModel (newElement);

    if (options.events !== false) {
      // Moved this into here. Now Element doesn't need to access Control, which it shouldn't
      var e = this.getEventHandler (ELEM_EVENTS_ID);
      if (e) e.push (newElement.getElementDiv ());
    }
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
    if (!checkFunc)
      checkFunc = function(e){
        return e.getValue () !== NULL_CHARACTER;
      }

    $ (elems).each ((i, e)=>{
      if (!checkFunc || checkFunc (e))
        this.removeElementById (e.getId ());
    });
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
