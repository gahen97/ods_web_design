 /*
    Base code for the View. This handles displaying models, dealing with
      elements, and anything UI-related.

    Documentation:
      constructor ()
        Takes no arguments.

      start ()
        Purpose: Loads the model.

      disable ()
        Disables interactions with the exercise.
      enable ()
        Enables interactions with the exercise.
      clear (opts : Object)
        Purpose: Clears the view, removing all elements.
        Arguments:
          opts  Object  Options. See ClearOptions below
        Returns: None
      register (eventHandler : CustomEventHandler)
        Purpose: Registers a CustomEventHandler to be called in response to DOM
                  events.
        Arguments:
          eventHandler  CustomEventHandler  An Event Handler to be triggered for
                                              each event. See DomEventHandler
        Returns: None
      addDOMEvent (event : EventData)
        Purpose: Adds handling of the given event and routing to the
                  CustomEventHandler.
        Arguments:
          event  EventData  Data for the event(s) to react to on given elements
        Returns: None
      getEventHandler (id : string)
        Gets the event handler with the given id.
      addToEventHandler (element : DOMObject, id : string)
        Purpose: Adds a given element as a trigger for the given event.
        Arguments:
          element  DOMObject  Element to use as a new trigger for the event
          id       string     ID of the event to add the element to
        Returns: None

      addElement (value : Any, options : Object)
        Purpose: Adds an element to the webpage.
        Arguments:
          value    Any     The value of the element to add
          options  Object  The options for the method. See below.
        Returns: The new element
      removeElementById (id : int) : Element
        Purpose: Removes an element, given its id.
        Arguments:
          id  int  The ID of the element to remove
        Returns: The element which was removed.
      removeElement (element : DOMObject) : Element
        Purpose: Removes an element, given its DOM Object.
        Arguments:
          element  DOMObject  The DOM Object representing the element to remove.
        Returns: The Element which was removed.
      removeElements (elements : Array of Element, checkFunc : function)
        Purpose: Removes every element in the elements array.
        Arguments:
          elements   Array of Element  The elements to remove
          checkFunc  function          A function to use to check if element
                                        should be removed. Will remove if
                                        returns true.
        Returns: None
      getElementById (id : int) : Element
        Returns the element matching the given ID.
      getElement (element : DOMObject) : Element
        Returns the element from the element's DOM Object.
      getValueFromElementDiv (element : DOMObject) : Element
        Returns the value of the element from the element's DOM Object.
      findByValue (value : Any) : Array of Element
        Returns all elements with the given value.
      findOneWithValue (value : Any) : Element
        Returns a single element with the given value.
      contains (value : Any) : boolean
        Returns true if any element with the given value exists.
      checkAnyInSet (elements : Array of Element) : boolean
        Returns true if any element from the array is within the model.
      valueInSet (value : Any) : boolean
        Returns true if any element with the given value is within the model.
      isElementOverModel (element : DOMObject) : boolean
        Returns true if the element is within the model.
      drawWithinModel (element : Element)
        Purpose: Moves the given element into the model's display.
        Arguments:
          element  Element  The element to move within the model's display
        Returns: None
      setActive (element : Element)
        Purpose: Sets a given element as active.
        Arguments:
          element  Element  The element to set active
        Returns: None
      runAnimations ()
        Purpose: Controls running any constant animations.
      displayModel (m : Model)
        Purpose: Draws the model to the screen, replacing any old one.
        Arguments:
          m  Model  The model to display
        Returns: None
      resizeModel ()
        Purpose: Fixes the height of the model.
      storePositions ()
        Purpose: Stores every element's position within the model,
                   so that the model can be resized.
      storePositionOf (element : DOMObject)
        Purpose: Stores the position of the given element within the model.
        Arguments:
          element  DOMObject  The element to store the position of
        Returns: None
      fixPositions ()
        Purpose: Fixes the position of every element based on their stored
                   positions.

    Options:
      clear ()
        checkFunc  function  A function to call for each element. If result
                               is truthy, element will be removed.
                             [ OPTIONAL ] Defaults to all elements.
      addElement ()

    Types:
      EventData
        Array of EventObjects
      EventObject
        An Object containing two key-value pairs:
          elem    Variant (see DOMEventHandler)   Elements to use for triggering
                                                    the event
          evtsArr Array of EventFunctionData      Array of data for each event
          id      string [ OPTIONAL ]             ID to store the event under.
      EventFunctionData
        An Object containing three key-value pairs:
          handlingFunction  function  Function to be called for the event
          customEvtName     string    Custom event to be triggered on DOM Event
          domEvtName        string    DOM Event to react to

*/

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
    if (!element) return null;

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
  checkAnyInSet (elements) {
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
    return this.checkAnyInSet (elements);
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
