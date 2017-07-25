/*jshint esversion: 6 */ 'use strict';

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
    this.tabs = new QuestionTabbify (this, {
      eventId: TABS_EVENTS_ID
    });
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

  // event handling
  addCustomEvent (name, handling)
  {
    this.customEventHandler.bind (name, handling, this);
  }

  addEvents ()
  {
    var events = null;

    for (var element of eventData)
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
      }, 3000);
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
