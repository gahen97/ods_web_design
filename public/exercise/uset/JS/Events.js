/*jshint esversion: 6 */ 'use strict';

/* helpers ... TODO global functions are bad */
function parseInput (input) {
  return input.trim ();
}

function isNullCharacter (element) {
  return $(element).text ().trim () === NULL_CHARACTER;
}

function inputError ()
{
  var validStr = control.validInputStr;

  if (validStr === "")
    return new ErrorDialog ("Invalid input ::: cannot add new elements ...");

  return new ErrorDialog ("Invalid input ::: Please enter a number between " + validStr);
}

/* Main Events .... These are the buttons independent of the exercise */
function onNextBtnClick (elem, evt) {
  // move to the next exercise ...
  if (this.exercise.next() === false)
    new SuccessDialog ("That's all, folks!"); // TODO
  else{
    // set active to null
    this.setActiveElement (null);
    this.updateActiveQuestion ();
  }
}

function onPrevBtnClick (elem, evt) {
  if (this.exercise.prev () === false)
    new ErrorDialog ("I will go this far, and no further!"); // 10 points if you can tell me the reference, eh? TODO
  else{
    // set active to null
    this.setActiveElement (null);
    this.updateActiveQuestion ();
  }
}

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

function onShowAnsBtnClick (elem, evt) {
  this.exercise.showAnswer ();
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


/* TAB EVENTS. THESE HANDLE DEALING WITH THE TABBING SYSTEM */
function clickedTab (element, evt)
{
  var data    = $(element).data ();
  var absQNum = data.absoluteQuestionNumber;

  if (!absQNum && absQNum !== 0)
  {
    console.error ("Was not given a question number. Throwing an error. ", element);
    return false;
  }

  this.exercise.goToQuestion (absQNum);
  this.updateActiveQuestion ();
}


/* MODEL */
function onModelResize (element, evt)
{
  // Fires off every step of the animation for resizing model ..
  // Move elements with the model, so they seem to look the same. How do I do that?
  // Magic.
  this.view.fixPositions();
}

function startModelResize (element, evt)
{
  this.view.storePositions();
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
  eventData =
  [
    {
      elem: $("#prevArrow"),
      evtsArr: [
        {
          handlingFunction: onPrevBtnClick,
          customEvtName: "prevBtnClick",
          domEvtName: "click"
        }
      ]
    },
    {
      elem: $("#nextArrow"),
      evtsArr: [
        {
          handlingFunction: onNextBtnClick,
          customEvtName: "nextBtnClick",
          domEvtName: "click"
        }
      ]
    },
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
    {
      elem: $(".showAnswerButton"),
      evtsArr: [
        {
          handlingFunction: onShowAnsBtnClick,
          customEvtName: "showAnsBtnClick",
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
    },

    /* TAB EVENTS */
    {
      elem: $(".tabbedQuestion"),
      evtsArr: [
        {
          handlingFunction: clickedTab,
          customEvtName: "goToQuestion",
          domEvtName: "click"
        }
      ],
      id: TABS_EVENTS_ID
    },

    /* MODEL EVENTS */
    {
      elem: $(".modelBody"),
      evtsArr: [
        {
          handlingFunction: onModelResize,
          customEvtName: "Resized",
          domEvtName: "model-resize" // FYI this is custom
        },
        {
          handlingFunction: startModelResize,
          customEvtName: "Resized[2]",
          domEvtName: "model-resize-start"
        }
      ]
    },

    /* WINDOW / MAIN EVENTS */
    {
      elem: $(window),
      evtsArr: [
        {
          handlingFunction: onModelResize,
          customEvtName: "Resize[3]",
          domEvtName: "resize"
        }
      ]
    }
  ];


  start ();
});
