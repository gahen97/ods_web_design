/*
  This controls making an element draggable for use with JsPlumb.
  When the element is dragged, all connectors, endpoints, ...
    will update to stay with the element.

  Documentation:
    constructor (element : Element, domObj : DOMObject)
      Makes the given domObj draggable.
      Arguments:
        element  Element    The element that will be associated with the draggable
        domObj   DOMObject  The DOM Element that should be dragged
    setDraggable (t : boolean)
      Purpose: Pauses / Restarts dragging on an element.
      Arguments:
        t  boolean  Whether to allow dragging. If true, element can drag;
                      if false, element will not be draggable
      Returns: None
*/
/*jshint esversion: 6 */ 'use strict';

class PlumbDraggable {
  constructor (eObj, element){
    this.element = element;
    this.elemObj = eObj;

    $ (element).draggable ({
      containment: 'parent',
      drag: () => {
        //this.elemObj.repaint ();
        jsPlumb.repaintEverything ();
      },
      stop: () => {
        jsPlumb.repaintEverything ();
      }
    });
  }

  setDraggable (t) {
    jsPlumb.setDraggable (this.element, t);
  }
}
