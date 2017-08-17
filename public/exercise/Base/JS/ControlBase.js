/*
  The base Control Object.

  This contains functionality that is used by the control object
    regardless of exercise.

  Documentation:
    constructor ()
      Takes no arguments.

    regenerate ()
      Purpose: When called, will load a new exercise (new questions).
      Side-Effect: After this is called, the:
                     exercise will update;
                     view will update;
                     tabs will update

  reset ()
    Purpose: Called for every new question (or on restart). Should reset exercise.

  restart ()
    Purpose: Restarts current question to reset all changes.

  restartExercise ()
    Purpose: Restarts current question while also calling the exercise to reset.

  next ()
    Purpose: Moves to the next question.

  disable()
    Purpose: Disables all user interaction with the exercise.

  enable()
    Purpose: Re-enables all user interaction with the exercise.

  check ()
    Purpose: Checks & reacts to the answer given by the user.

  updateActiveQuestion ()
    Purpose: Updates the currently highlighted question within the tabbing system.

  validInput (input : string) : boolean
    Purpose: Determines if a given input string is valid for the current question.
    Arguments:
      input  string  The user's input to be inserted.
    Returns:
      Boolean  Determination of whether the value is valid.

  addCustomEvent (name : string, handling : function)
    Purpose: Adds a custom event to be triggered later.
    Arguments:
      name      string     The name to bind the custom event to
      handling  function   The function to be triggered for the event
    Returns: none

  addEvents ([events : object])
    Purpose: Creates all events from the global eventData
    Arguments:
      events  object  A list of events to be added [OPTIONAL. DEFAULTS TO GLOBAL eventData]
    Returns: None

  addToEvent (element: DomObject, eventId : string)
    Purpose: Adds an element to a DOM event, specified by the eventId.
    Arguments:
      element  DOM Object  Object to be tracked for the specified DOM Events
      eventId  string      The ID of the event to add the element to
    Returns: None

  getDomEventHandler (id : string) : DOMEventHandler
    Returns: The DOM Event Handler specified by the given ID.

  removeElement (e : DOMObject)
    Purpose: Removes a given element from the exercise.
    Arguments:
      e  DOM Object  The DOM Object for the element to be removed
    Returns: None

  setActiveElement (element : DOMObject)
    Purpose: Sets a given element as the currently active element.
    Arguments:
      element  DOM Object  The DOM Object for the element to be set as active.
    Returns: None

  find (value : Any) : Element
    Purpose: Finds an element with the given value within the exercise.
    Arguments:
      value  Any  The value of the element to look for.
    Returns: ONE element object with the given value
    NOTE: This may work unexpectedly if there are multiple elements with the
            same value.

  canSetActive () : boolean
    Returns: Boolean. Determines if an element can be set as active for the
                        current question.

  setModel (m : Model)
    Purpose: Updates the current model for the exercise.
    Arguments:
      m  Model  The model to be set to.
    Returns: None.
    Side-Effect: Will update the model being displayed to the new model.

  animationLoop ()
    Purpose: Loops through any animations to be run indefinitely.
    NOTE: This should be called only once to avoid unexpected behaviour.
            The loop will continue running afterwards.

  Properties:
    .validInputStr   string   A string representing the range of valid input
                                for the current question.
*/

/*jshint esversion: 6 */ 'use strict';

const animLoopSpeed = 3000;

class ControlBase {
  constructor()
  {
    this.userModel = new __MODULENAME__ ();

    this.exercise = new Exercise();
    this.exercise.setup();

    this.customEventHandler = new CustomEventHandler();

    this.view = new View ();

    this.addEvents ();

    this.view.register (this.customEventHandler);

    this.view.start ();
    this.exercise.load ();

    // add tabbing
    this.tabs = new QuestionTabbify (this, TABS_EVENTS_ID);
    this.updateActiveQuestion();

    this.animationLoop ();
  }

  regenerate ()
  {
    this.view.clear ();
    this.exercise.setup ();

    this.view.start ();
    this.exercise.load ();

    this.tabs.regenerate (this);
    this.updateActiveQuestion ();
  }

  reset(){

  }

  restart(){
    this.updateActiveQuestion();
    this.reset ();
  }

  restartExercise (){
    if (this.exercise.restart() === false)
      return false;

    // set active to null
    this.restart ();
    return true;
  }

  // move to next question
  next () {
    if (this.exercise.next() === false)
      new SuccessDialog ("That's all, folks!"); // TODO
    else{
      // set active to null
      this.restart ();
    }
  }

  // disable, enable
  disable () { this.view.disable (); this.disabled = true; }
  enable () { this.view.enable (); this.disabled = false; }

  // tabs
  updateActiveQuestion () {
    var active = this.exercise.getCurrQuestionId ();
    this.tabs.setActiveQuestion (active);
  }

  // input
  validInput (input)
  {
    return this.exercise.isInputValid (input);
  }

  get validInputStr ()
  {
    return this.exercise.validInputStr;
  }

  // check answer
  check(){
    if (this.exercise.check (this.userModel, this.activeElement)) {
      new Popup ("Correct!");
      this.next ();
    } else {
      new Popup ("That's wrong."); //TODO
    }
  }
  // event handling
  addCustomEvent (name, handling)
  {
    this.customEventHandler.bind (name, handling, this);
  }

  addEvents (evts)
  {
    var events  = null;
    var evtData = evts || eventData;

    for (var element of evtData)
    {
      this.view.addDOMEvent(element);

      events = element.evtsArr;

      for (var event of events)
      {
        this.addCustomEvent(event.customEvtName, event.handlingFunction);
      }
    }
  }

  addToEvent (element, eventId) {
    this.view.addToEventHandler (element, eventId);
  }

  // find by id
  getDomEventHandler (id) {
    return this.view.getEventHandler (id);
  }

  // remove an element
  removeElement (e)
  {
    var value = this.view.getValueFromElementDiv (e);

    // remove from the dom
    this.view.removeElement (e);
  }

  // set active element
  setActiveElement (element) {
    if (this.activeElement === element)
      element = null;
    
    this.activeElement = element;
    this.view.setActive (element);
  }

  // find an element
  find (value) {
    return this.view.findOneWithValue (value);
  }

  canSetActive () { return this.exercise.canSetActive (); }

  /* --- MODELS ---- */
  setModel (m) {
    // add everything to the userModel
    var c = m.copy ();
    this.userModel = c;

    this.view.displayModel (c);
  }


  animationLoop(){
    var callback = () => {
      setTimeout (() => {
        this.animationLoop.call (this);
      }, animLoopSpeed);
    }

    if (!this.view) return callback();

    if (this.disabled)
      return callback();

    self.loopTimeout=false;
    this.view.runAnimations(()=>{
      if (self.loopTimeout) return;
      self.loopTimeout=true;

      callback ();
    });
  }
}
