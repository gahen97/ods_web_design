/*
  This handles setting an element as a target, so that connections can be made with
    the element.

  Documentation:
    constructor (element : DOMObject, eObj : Element, opts : Options)
      Sets the element to be a target for JsPlumb.
      Arguments:
        element  DOMObject  The element to make into a target
        eObj     Element    The Element relating to the given element object
        opts     Options    Options for the target. See Options, below
    disable ()
      Disables the element so that it cannot be connected to.
    enable ()
      Enables the element so that it can be connected to.

    Options:
      maxConnections  int     The maximum number of connections that can use this
                                element as their target.
      anchor          Anchor  The Anchor to use for the target. For more information, see:
                                https://jsplumbtoolkit.com/community/doc/anchors.html

    Properties:
      .uuid  string  The ID of the endpoint

*/

/*jshint esversion: 6 */ 'use strict';

class PlumbTarget {
  static get nextId(){ return PlumbTarget.id ++; }

  constructor (e, eObj, opts) {
    this.elem    = e;
    this.elemObj = eObj;

    this.id = "target-" + PlumbTarget.nextId;
    this.plumbed = this.makeTarget (e, opts);
  }

  makeTarget (element, options) {
    if (!options) options={};
    if (!element) element = this.elem;
    if (!element) return false;

    return jsPlumb.makeTarget (element, {
      isSource: false,
      isTarget: true,
      maxConnections: options.maxConnections || 1,
      endpoint: [ "Dot", {radius:5} ],
      cssClass: "jsplumb-target no-visibility",
      anchor: options.anchor || [0.5, 0.5, 0, 0],

      id: this.id
    })
  }

  setEnabled (t) { jsPlumb.setTargetEnabled (this.elem, t); }
  disable(){ this.setEnabled (false); }
  enable(){ this.setEnabled (true); }

  get uuid() { return this.plumbed.getId(); }
}

PlumbTarget.id = 1230;
