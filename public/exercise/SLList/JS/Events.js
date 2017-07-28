/*jshint esversion: 6 */ 'use strict';

/*
  This handles all the event handling for the exercise.
*/

/* helpers ... TODO global functions are bad */

//TODO
function onCheckBtnClick (elem, evt) {
  // NOTE: Should check pointers (left & right) are correct,
  //       levels are correct

  // Check solutions here
}


/* INPUT BOX EVENTS */
function onSubmitInput (element, evt) {
  if (!inputValid.apply(this))
    return inputError();

  var input = $ (".modelEntry").val ();
  input     = parseInput (input);

  // Add a new element with given input

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
}

function onElementClicked (elem, ...args){
  var element = this.view.getElement (elem);
  if (!element) return;
  if (!this.canSetActive (element))
  {
    if (DEBUG) console.log("From inside onElementClicked element cannot be set as active.");
    return;
  }
  if (this.activeElement === element)
    this.setActiveElement (null);
  else
    this.setActiveElement (element);
}

// Other stuff to deal with blah

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
  var coreEvents = getCoreEvents ();
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
    }
  ];

  eventData = coreEvents.concat (eventData);
  start ();
});
