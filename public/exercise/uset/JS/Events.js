/*jshint esversion: 6 */ 'use strict';

/*
  This handles all the event handling for the exercise.
*/

/* helpers ... TODO global functions are bad */
function isNullCharacter (element) {
  return $(element).text ().trim () === NULL_CHARACTER;
}

/* Main Events .... These are the buttons independent of the exercise */
//TODO
function onCheckBtnClick (elem, evt) {
  if (this.exercise.check (this.userModel, this.activeElement)) {
    //TODO
    //Maybe make custom event that checks?
    new Popup ("Correct!");
    onNextBtnClick.apply(this, arguments);
  } else {
    new Popup ("That's wrong."); //TODO
  }
}

/* INPUT BOX EVENTS */
function onSubmitInput (element, evt) {
  var input = $ (".modelEntry").val ();

  input = parseInput (input);
  if (!this.validInput (input))
    return inputError ();

  this.view.addElement (input);
  $(".modelEntry").val("");
};

function checkEnter (element, evt) {
  if (evt.keyCode !== 13)  return;
  // UPDATE - Keeping this as an alternate method
  onSubmitInput.call (this, element, evt);
}

/*
  ELEMENT EVENTS. These are specific to Element.js and will be added separately
   for every new Element div that gets created.
*/
function onDragStarted(...args)
{
}

function onDragStopped (elem, evt, ui)
{
  this.view.storePositionOf ($(elem));

  if (isNullCharacter (elem)) return;

  var over = this.view.isElementOverModel (elem);
  var data = this.view.getValueFromElementDiv (elem);
  if (!data) return;

  //everytime an element is added or removed, clear uset, add everything that's currently in there.
  //on drag stop
  if (over)
    this.userModel.add (data);
  else if (!this.view.valueInSet (data))
    this.userModel.remove (data);

  // store this as a data-in
  $ (elem).data ("in", over);
}

function onElementClicked (elem, ...args){
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

  if (isNullCharacter (draggable)) {
    new ErrorDialog ("Null element cannot be deleted!"); // TODO
    return false;
  }

  this.removeElement (draggable);
}

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
          handlingFunction: onDragStopped,
          customEvtName: "onDragStopped",
          domEvtName: "dragstop"
        },
        {
          handlingFunction: onDragStarted,
          customEvtName: "onDragStarted",
          domEvtName: "dragstart"
        },
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
    }
  ];

  eventData = baseEvts.concat(eventData);
  start ();
});
