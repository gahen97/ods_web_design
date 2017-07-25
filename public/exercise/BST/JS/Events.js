/*jshint esversion: 6 */ 'use strict';

/*
  This handles all the event handling for the exercise.
*/

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
    this.restart ();
  }
}

function onPrevBtnClick (elem, evt) {
  if (this.exercise.prev () === false)
    new ErrorDialog ("I will go this far, and no further!"); // 10 points if you can tell me the reference, eh? TODO
  else{
    // set active to null
    this.restart();
  }
}

//TODO
function onCheckBtnClick (elem, evt) {
  // NOTE: Should check pointers (left & right) are correct,
  //       levels are correct
  var roots = this.userModel.getRoots ();
  if (roots.length>1){
    new ErrorDialog ("You may only have one tree, muggle!");
    return false;
  }

  var tree = this.userModel.getTrees () [0];

  if (this.exercise.check (tree, this.activeElement, this.userDataArray)) {
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

function onRestartBtnClick (elem, evt) {
  if (this.exercise.restart() === false)
    new ErrorDialog ("You have broken the space time continuum"); // TODO
  else{
    // set active to null
    this.restart ();
  }
}

/* INPUT BOX EVENTS */
function inputValid() {
    var input = $ (".modelEntry").val ();

    input = parseInput (input);


    return (this.validInput (input))
}
function onSubmitInput (element, evt) {
  if (!inputValid.apply(this))
    return inputError();

  var q = this.exercise.getCurrQuestion ();
  var m = q && q.getModel ();
  var d = m && m.height ();

  var input = $ (".modelEntry").val ();
  input = parseInput (input);

  var newNode = this.userModel.makeNode (parseInt (input));

  this.view.addElement (parseInt (input), {
    constructArgs: {
      maxDepth: d + 1,
      nodeId:   newNode.id,
      node:     newNode
    }
  });
  $(".modelEntry").val("");
};

function checkEnter (element, evt) {
  if (evt.keyCode !== 13)  return;
  // UPDATE - Keeping this as an alternate method
  onSubmitInput.call (this, element, evt);
}

function onInputChanged() {
  let enterBtn = $("#button_enter");

  if (!inputValid.apply(this))
    enterBtn.addClass("disabled");
  else{
    enterBtn.removeClass("disabled");
    Animation.run ("show", enterBtn, {effect: "bounce", options: {distance: 7}, duration: 100});
  }
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

function elemMoveDown (active) {
  return active.moveDown ();

  /*var um     = this.userModel;
  var st     = um.subtree (active.getValue ());

  if (!st)
    active.moveDown();
  else {
    var t      = st.height ();
    var maxDep = this.view.maxDepth;

    if (t + um.depth (active.getValue()) + 1 > maxDep)
      return false;
    st.each ((data, node)=>{
      this.view.findFromNid (node.id).moveDown ();
    });

    jsPlumb.repaintEverything ();
  }

  return true; */
}

function elemMoveUp (active) {
  return active.moveUp ();
  /*console.log(active);
  var st     = this.userModel.subtree (active.getValue ());
  if (!st)
    active.moveUp();
  else{
    if (this.userModel.depth (active.getValue()) < 1)
      return false;

    st.each ((data, node)=>{
      this.view.findFromNid (node.id).moveUp ();
    })

    jsPlumb.repaintEverything ();
  }

  return true;*/
}

function elementDragged (elem, evtObj, jqEvtObj) {
  var top = jqEvtObj.position.top / LEVEL_HEIGHT;
  var element = this.view.getElement (elem);
  var origTop = element.getLevel();

  if (!element) return false;
  if (origTop === top) return false;
  if (origTop > top) {
    for (var i = top; i < origTop; i++)
      if (!elemMoveUp.call (this, element)){
        console.log ("we say neigh neigh");
        return false;
      }
  } else {
    for (var i = origTop; i < top; i++)
      if (!elemMoveDown.call (this, element)) {
        console.log ("jibbity job");
        return false;
      }
  }
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

  if (isNullCharacter (draggable)) {
    new ErrorDialog ("Null element cannot be deleted!"); // TODO
    return false;
  }

  this.removeElement (draggable);
}

/* ANIMATION DURATION BUTTON EVENTS. HANDLE ANIMATION SETTINGS */
function animDurClick (element, evt) {
  AnimationSettings.nextDuration ();
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


/* JSPLUMB */
function connectBetween (plumbEvt, mode) {
  if (!plumbEvt) return false;

  var src = plumbEvt.source;
  var trg = (mode === "connect") ? plumbEvt.target : null;
  var sep = plumbEvt.sourceEndpoint;
  var tep = (mode === "connect") ? plumbEvt.targetEndpoint : null;

  var side = sep && sep.getParameter ("side")
  if (DEBUG)
    console.log("Src Node: ", src, " on side: ", side);
  if (!src || !side) return false;

  var srcElem = this.view.getElement (src) || sep.getParameter ("srcElement");
  var trgElem = this.view.getElement (trg);
  if (DEBUG) console.log ("SOURCE ELEMENT : ", srcElem);
  if (!srcElem) return false;

  if (trgElem && srcElem.getLevel() !== trgElem.getLevel() - 1)
    jsPlumb.deleteConnection (plumbEvt.connection);

  var srcId = srcElem ? srcElem.nodeId : parseInt (this.view.getIdFromElementDiv (src));
  var trgId = trgElem ? trgElem.nodeId : parseInt (this.view.getIdFromElementDiv (trg));

  if (DEBUG) console.log ("IDs: ", srcId, " , ", trgId, "   . ", trgElem, " : ", trg);

  if (srcId === trgId){
    console.error ("Error attempting to connect a node to itself.");
    return false;
  }

  var runningDownANode; // TODO new road
  switch (side) {
    case DIRECTION_LEFT:
      runningDownANode = this.userModel.setLeft (srcId, trgId);
      break;
    case DIRECTION_RIGHT:
      runningDownANode = this.userModel.setRight (srcId, trgId);
      break;
    default:
      console.error ("UNKNOWN SIDE ", side);
      break;
  }

  return true;
}

function doConnect (elem, plumbEvt, origEvt){
  connectBetween.call (this, plumbEvt, "connect")
}

function connectDetach (elem, plumbEvt, origEvt){
  connectBetween.call (this, plumbEvt, "detach");
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
    {
      elem: $(".redoQuestionButton"),
      evtsArr: [
        {
          handlingFunction: onRestartBtnClick,
          customEvtName: "redoQBtnClick",
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
          },
          {
            handlingFunction: onInputChanged,
            customEvtName: "input-change",
            domEvtName: "input"
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

    /* ANIMATION DURATION SETTINGS BUTTON EVENTS */
    {
      elem: $("#animationDuration"),
      evtsArr: [
        {
          handlingFunction: animDurClick,
          customEvtName: "nextAnimationDuration",
          domEvtName: "click"
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
    },

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


  start ();
});
