/*jshint esversion: 6 */ 'use strict';

/*
  This handles all the event handling for the exercise.
*/

/* helpers ... TODO global functions are bad */

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


/* INPUT BOX EVENTS */
function inputValid() {
    var input = $ (".modelEntry").val ();

    input = parseInput (input);

    return (this.validInput (input));
}
function onSubmitInput (element, evt) {
  var input = $ (".modelEntry").val ();

  input = parseInput (input);
  if (!this.validInput (input))
    return inputError ();

  var q = this.exercise.getCurrQuestion ();
  var m = q && q.getModel ();
  var d = m && m.height ();

  // find a priority based on the question
  var val = parseInt (input);
  var p = q.getNodePriority ? q.getNodePriority(val) : m && m.getRandomPriority();

  // create the new node ...
  var newNode = this.userModel.makeNode (val, p);

  this.view.addElement (input, {
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

  this.removeElement (draggable);
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
