/*
  This is the main handler for all events that may occur. Any event handling
    should be done in here.

  To add an event:
    Add a new event object into the eventData array, containing:
      {
        elem: [DOM Elements],
        evtsArr: [
          {
            handlingFunction: FUNCTION NAME,
            customEvtName: "SOME CUSTOM EVENT NAME",
            domEventName: "DOM EVENT NAME"
          }
        ],
        id: "SOME ID"
      }

      Where:
        elem              Object               Object to use as triggerer for the events
        evtsArr           Array of EventData   Events that should be handled on
                                                 given element(s)
        handlingFunction  function             Function to use as the event handler
        customEvtName     string               Name of the custom event
        domEvtName        string               DOM Event to use as the trigger
        id [ OPTIONAL ]   string               ID to use for the event

    Any handling functions will be sent in 2+ arguments:
      element  Object     The element which fired off the event
      evt      eventData  The event data sent from JQuery for the event

    Any extra arguments sent from the event will be passed through to the
      event handler.

  Documentation:
    onCheckBtnClick ()
      Purpose: Handles the check button to check the user's answer.
    onSubmitInput ()
      Purpose: Handles the insert button to insert input.
    checkEnter ()
      Purpose: Handles pressing the enter key to insert input.
    onElementClicked (element : DOMObject)
      Purpose: Handles clicking on an element to activate it.
      Arguments:
        element  DOMObject  The element which was clicked
      Returns: None
    droppedOnTrash (element : DOMObject, evt : EventData, ui : JsPlumbInfo)
      Purpose: Handles dropping an element onto the trash bin.
      Arguments:
        element  DOMObject    The trash bin
        evt      EventData    The JQuery Event Data
        ui       JsPlumbInfo  The info sent from JsPlumb's event
      Returns: None

  Should edit, add other event handlers.
*/
/*jshint esversion: 6 */ 'use strict';

function onCheckBtnClick () {
  control.check ();
}

/* INPUT BOX EVENTS */
function onSubmitInput () {
  var input = $ (".modelEntry").val ();

  input = parseInput (input);
  if (!this.validInput (input))
    return inputError ();

  this.view.addElement (input);
  $(".modelEntry").val("");
};

function checkEnter () {
  if (evt.keyCode !== 13)  return;
  // UPDATE - Keeping this as an alternate method
  onSubmitInput.call (this, ...arguments);
}

/*
  ELEMENT EVENTS. These are specific to Element.js and will be added separately
   for every new Element div that gets created.
*/
function onElementClicked (elem){
  var element = this.view.getElement (elem);
  if (!element) return;
  if (!this.canSetActive ())
  {
    if (DEBUG) console.log("From inside onElementClicked element cannot be set as active.");
    return;
  }

  this.setActiveElement (element);
}

/* TRASH CAN EVENTS. THIS BASICALLY HANDLES DELETING ELEMENTS */
function droppedOnTrash (element, evt, ui) {
  var draggable = ui.draggable;
  if (!draggable)
  {
   console.error("From inside droppedOnTrash, ui does not have draggable.") ;
   return false;
  }

  this.removeElement (draggable);
}

/* MODEL */


  //must be loaded after page body loads (this refers to eventData, not these handling functions above)
//[{elem: , customEventName: , handlingFunction: },{},{}]

/*var events =
[
  {
    elem: $("#myId"),
    evtsArr: [
      {
        handlingFunction: function,
        customEvtName: string,
        domEvtName: string
      },
      {
        handlingFunction: function,
        customEvtName:string,
        domEvtName: string
      }
    }
    }
    ]

  }
  },
];*/


var eventData = null;   //need to do it this way because of scope
$ (()=> {
  var baseEvts = getCoreEvents ();
  eventData =
  [
    {
      elem: $(".checkAnswerButton"),
      evtsArr: [
        {
          handlingFunction: onCheckBtnClick,
          customEvtName: "checkBtnClick",
          domEvtName: "click"
        }
      ]
    },

    /* INPUT TEXT AREA */
    {
        elem: $(".modelEntry"),
        evtsArr: [
          {
            handlingFunction: checkEnter,
            customEvtName: "checkEnterButton",
            domEvtName: "keyup"
          }
        ]
    },

    /* SUBMIT BUTTON */
    {
      elem: $("#button_enter"),
      evtsArr: [
        {
          handlingFunction: onSubmitInput,
          customEvtName: "inputSubmitted",
          domEvtName: "click"
        }
      ]
    },

    /* ELEMENT EVENTS --- OCCUR ON SPECIFIC ELEMENTS, ADDED LATER */
    {
      elem: [ ],
      evtsArr: [
        {
          handlingFunction: onElementClicked,
          customEvtName: "onElementClicked",
          domEvtName: "click"
        },
      ],
      id: ELEM_EVENTS_ID // so it can be found later. take a look at the view
    },


    /* TRASH CAN EVENTS ----- OCCUR ON THE TRASH CAN. #TRASH */
    {
      elem: $("#trash"),
      evtsArr: [
        {
          handlingFunction: droppedOnTrash,
          customEvtName: "deleteElement", //TODO although I like this name
          domEvtName: "drop"
        }
      ]
    },
  ];

  eventData = baseEvts.concat(eventData);
  start ();
});
