/*jshint esversion: 6 */ 'use strict';

/*
  This handles all the event handling for the exercise.
*/

/* helpers ... TODO global functions are bad */

//TODO
function onCheckBtnClick (elem, evt) {
  // NOTE: Should check pointers (left & right) are correct,
  //       levels are correct
  if (this.exercise.check (this.userModel, this.activeElement, this.userDataArray)) {
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
  if (!inputValid.apply(this))
    return inputError();

  var input = $ (".modelEntry").val ();
  input = parseInput (input);

  var newId = this.addNode (input);
  this.view.addElement (input, {
    constructArgs: {
      nodeId: newId
    }
  });

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

function elementDragged (elem, evtObj, jqEvtObj) {
}

function toggleClassHover (element, isOn) {
  var e = this.view.getElement (element);
  if (!e) e = $(element).data("element");
  if (!e) return false;

  if (typeof isOn === "function")
    isOn = isOn (e);

  if (!isOn && e.isHovered()) return false;
  e.toggleClass ("jsp-hover", isOn)
}

function onElemMouseOver (element) {
  // If it moves onto the endpoint div,
  // will fire both off & on. this is buggy wugsy so set a timeout
  // and if that's the case this'll delay enough to always set active
  setTimeout(()=>{
    toggleClassHover.call (this, element, true);
  }, 5);
}

function onElemMouseOff (element) {
  toggleClassHover.call (this, element, false);
}

function checkElemHover (element) {
  toggleClassHover.call (this, element, (e)=>{
    return e.isHovered ();
  });
}

/* TRASH CAN EVENTS. THIS BASICALLY HANDLES DELETING ELEMENTS */
function droppedOnTrash (element, evt, ui) {
  var draggable = ui.draggable;
  if (!draggable)
  {
   console.error("From inside droppedOnTrash, ui does not have draggable.") ;
   return false;
  }

  var ret = this.removeElement (draggable);
  if (ret === false)
    new ErrorDialog ("Cannot delete dummy node! That would be dumb!");
}

/* JSPLUMB */
function connectBetween (plumbEvt, mode) {
  var src = plumbEvt.source;
  var trg = plumbEvt.target;

  var e1  = this.view.getElem (src);
  var e2  = this.view.getElem (trg);

  if (!e1 || (!e2 && mode === "connect")) return false;

  var node1 = this.view.getNodeId (e1);
  var node2 = (mode === "connect") ? this.view.getNodeId (e2) : null;

  // determine the side ...
  var side = $(src).data ("side");
  
  if (node1 === node2){
    jsPlumb.deleteConnection (plumbEvt.connection);
    return false;
  }

  // connecty
  this.connect (node1, node2, side);
  setTimeout(()=>{
    control.update ();
    jsPlumb.repaintEverything(); // TODO
  }, 10)
}

function doConnect (elem, plumbEvt, origEvt){
  return connectBetween.call (this, plumbEvt, "connect")
}

function connectDetach (elem, plumbEvt, origEvt){
  return connectBetween.call (this, plumbEvt, "detach");
}

function disconnectOnClickAMijiggles (elem, plumbEvt, origEvt) {
  jsPlumb.deleteConnection(plumbEvt.connection, {
    fireEvent: true
  });
}

// The Nintendo DS was actually a very good gaming system
function remHovOnDS (elem, conn, origEvt){
  var src = conn.source ? $(conn.source) : $("#" + conn.sourceId);
  if (!src || src.length===0) return;

  setTimeout(()=>{checkElemHover.call (this, src);}, 10);

  return true;
}
function addHovWhileDragging (elem, conn, origEvt){
  var src = conn.source ? $(conn.source) : $("#" + conn.sourceId);
  if (!src || src.length===0) return;

  var elem = this.view.getElement (src);
  if (!elem) return;

  checkElemHover.call (this, src);
}

function targetPriorityInit (element, plumbEvt, origEvt) {
  $(".jsplumb-target").addClass ("high-priority");
}
function targetPriorityRem () {
  $(".high-priority").removeClass ("high-priority");
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
        {
          handlingFunction: elementDragged,
          customEvtName: "onElementDragged",
          domEvtName: "drag"
        },
        {
          handlingFunction: onElemMouseOver,
          customEvtName: "here's johnny",
          domEvtName: "mouseenter"
        },
        {
          handlingFunction: onElemMouseOff,
          customEvtName: "no tv and no beer make homer something something",
          domEvtName: "mouseleave"
        },
      ],
      id: ELEM_EVENTS_ID // so it can be found later. take a look at the view
    },

    /* ENDPOINT EVENTS ---- STYLING AND OTHER MAGIC */
    {
      elem: [ ],
      evtsArr: [
        {
          handlingFunction: onElemMouseOver,
          customEvtName: "here's johnny",
          domEvtName: "mouseenter"
        },
        {
          handlingFunction: onElemMouseOff,
          customEvtName: "no tv and no beer make homer something something",
          domEvtName: "mouseleave"
        },
      ],
      id: ENDPOINT_EVENTS_ID // so it can be found later. take a look at the view
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

    /* JSPLUMB EVENTS */
    {
      elem: [jsPlumb],
      evtsArr: [
        {
          handlingFunction: doConnect,
          customEvtName: "jsp-connect",
          domEvtName: "connection"
        },
        {
          handlingFunction: connectDetach,
          customEvtName: "jsp-connect-detach",
          domEvtName: "connectionDetached"
        },
        {
          handlingFunction: disconnectOnClickAMijiggles,
          customEvtName: "jsp-click-detach",
          domEvtName: "beforeStartDetach"
        },
        {
          handlingFunction: remHovOnDS,
          customEvtName: "jsp-drag-stop",
          domEvtName: "connectionAborted"
        },
        {
          handlingFunction: remHovOnDS,
          customEvtName: "jsp-drag-stop",
          domEvtName: "connectionDragStop"
        },
        {
          handlingFunction: addHovWhileDragging,
          customEvtName: "jsp-dragging",
          domEvtName: "connectionDrag"
        },
        {
          handlingFunction: targetPriorityInit,
          customEvtName: "jsp-target-class-add",
          domEvtName: "connectionDrag"
        },
        {
          handlingFunction: targetPriorityRem,
          customEvtName: "jsp-target-class-rem",
          domEvtName: "connectionDragStop"
        },
      ]
    }
  ];

  eventData = coreEvents.concat (eventData);
  start ();
});
