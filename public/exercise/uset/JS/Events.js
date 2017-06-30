/*jshint esversion: 6 */ 'use strict';

// TODO Clicking show answer button multiple times is immensely fun.
//      For the end user, having fun is bad. We should probably fix this.

/* helpers ... TODO global functions are bad */
function parseInput (input) {
  return input.trim ();
}

function isNullCharacter (element) {
  return $(element).text ().trim () === NULL_CHARACTER;
}

/* Main Events .... These are the buttons independent of the exercise */
function onNextBtnClick (elem, evt) {
  // move to the next exercise ...
  this.exercise.next();

  // set active to null
  this.setActiveElement (null);
}

function onPrevBtnClick (elem, evt) {
  this.exercise.prev ();

  // set active to null
  this.setActiveElement (null);
}

//TODO
function onCheckBtnClick (elem, evt) {
  console.log ("Checking your answer .... ");
  if (this.exercise.check (this.userModel, this.activeElement)) {
    //TODO
    //Maybe make custom event that checks?
    console.log ("yep :/");
    onNextBtnClick.apply(this, arguments);
  } else {
    console.log ("lozzzzzer"); //TODO
  }
}

function onShowAnsBtnClick (elem, evt) {
  // TODO
  this.exercise.showAnswer ();
}

/* INPUT BOX EVENTS */
// TODO: This only works with keyboards. Find a way to make this usable
//       on other devices (touch)
function onSubmitInput (element, evt) {
  // TODO added custom event. Check this for spiders. I'm not personally going to go over it; spiders are scary. But you go ahead
  var input = $ (element).val ();

  input = parseInput (input);
  if (!this.validInput (input)) return;
  if (this.view.findByValue (input)) return; // IF THERE'S ALREADY ONE, WE BROK

  this.view.addElement (input);
};

function checkEnter (element, evt) {
  if (evt.keyCode !== 13) return;

  // TODO remove this entirely
  onSubmitInput.call (this, element, evt);
}

/*
  USET EVENTS. THESE OCCUR WHEN AN ELEMENT IS DROPPED ONTO / OFF OF THE USET DIV
*/
/*
// TODO These two can be removed:
function elementOver (element, evt, ui) {
  $(ui.draggable).data ("over", true);
}

function elementOff (element, evt, ui) {
  $(ui.draggable).data ("over", false);
}
*/

/*
  ELEMENT EVENTS. These are specific to Element.js and will be added separately
   for every new Element div that gets created.
*/
function onDragStarted(...args)
{
}

function onDragStopped (elem, evt, ui)
{
  if (isNullCharacter (elem)) return;

  var over = this.view.isElementOverModel (elem); // TODO WAFFLES
  var data = this.view.getValueFromElementDiv (elem);
  if (!data) return;

  // TODO: If an element is added several times,
  //       Display will show multiple, Uset will have one.
  //       This will cause issues. Fix this.

  //everytime an element is added or removed, clear uset, add everything that's currently in there.
  //on drag stop
  //check if over ? in = true : in false;
  if (over)
    this.userModel.add (data);
  else
    this.userModel.remove (data);

  // this is the "check if over ? in = true : in false;". simplified
  $ (elem).data ("in", over);
}

function onElementClicked (elem, ...args){
  var element = this.view.getElement (elem);
  if (!element) return;
  if (!this.canSetActive ())
  {
    if (DEBUG) console.log("From inside onElementClicked element cannot be set as active.");
    return; // TODO: ???
  }

  this.setActiveElement (element);
}

/*
  TODO This can be removed
const ELEM_EVENTS = { //this is analogous to a triggermap
  //should we put this into eventData
  //needs some way to be found outside of the controller - so we could, but would have to find a way to get it later
  "dragstart": "onDragStarted",
  "dragstop": "onDragStopped",
  "click": "onElementClicked"
};
*/

/* TRASH CAN EVENTS. THIS BASICALLY HANDLES DELETING ELEMENTS */
function droppedOnTrash (element, evt, ui) {
  var draggable = ui.draggable;
  if (!draggable)
  {
   console.error("From inside droppedOnTrash, ui does not have draggable.") ;
   return false;
  }

  if (isNullCharacter (draggable)) return false;

  this.removeElement (draggable);
}


/* TAB EVENTS. THESE HANDLE DEALING WITH THE TABBING SYSTEM */
function clickedTab (element, evt)
{
  console.log ("hello world");

  var data    = $(element).data ();
  var absQNum = data.absoluteQuestionNumber;

  console.log (absQNum);
  
  if (!absQNum && absQNum !== 0)
  {
    console.error ("Why must you turn this house into a house of lies? : ", element);
    return false;
  }

  this.exercise.goToQuestion (absQNum);
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
      elem: $("#checkBtn"),
      evtsArr: [
        {
          handlingFunction: onCheckBtnClick,
          customEvtName: "checkBtnClick",
          domEvtName: "click"
        }
      ]
    },
    {
      elem: $("#showAnswerBtn"),
      evtsArr: [
        {
          handlingFunction: onShowAnsBtnClick,
          customEvtName: "showAnsBtnClick",
          domEvtName: "click"
        }
      ]
    },

    /* INPUT TEXT AREA */
    /*{
        elem: $(".modelEntry"),
        evtsArr: [
          {
            handlingFunction: checkEnter,
            customEvtName: "checkEnterButton",
            domEvtName: "keyup"
          }
        ]
    },*/

    /* SUBMIT BUTTON */
    {
      elem: $("#submitbtn"),
      evtsArr: [
        {
          handlingFunction: onSubmitInput,
          customEvtName: "They submitted. What do you do next?",
          domEvtName: "click"
        }
      ]
    },

    /* USET EVENTS ---- OCCUR ON THE MAIN MODEL DISPLAY */
  /*  { // TODO remove
      elem: $("#model"),
      evtsArr: [
        {
          handlingFunction: elementOver,
          customEvtName: "overTopOfTheSpatula", //TODO
          domEvtName: "dropover"
        },
        {
          handlingFunction: elementOff,
          customEvtName: "goodbyeMrSpatula", //TODO
          domEvtName: "dropout" // aww, poor guy. was a college dropout.
        }
      ]
    },*/

    /* ELEMENT EVENTS --- OCCUR ON SPECIFIC ELEMENTS, ADDED LATER */
    {
      elem: [ ], // TODO: Make this better? For now, handles connecting for elements
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
          customEvtName: "trashyMcTrashTrash", //TODO although I like this name
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
          customEvtName: "goToQuestionMagic",
          domEvtName: "click"
        }
      ],
      id: TABS_EVENTS_ID
    }
  ];


  start ();
});
