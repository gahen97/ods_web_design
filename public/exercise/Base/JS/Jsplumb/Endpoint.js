/*
  This class controls drawing JSPlumb Endpoints.

  Documentation:
    constructor (element : Element, opts : Options, data : Object, ...)
      Draws an endpoint onto the given element.
      Arguments:
        element  Element  The element to add the endpoint to
        opts     Options  Options for drawing the endpoint. See Options below
        data     Object   A list of key-value pairs to add as data to the endpoint.
                            Each will be added to the created DOM elements.

    drawEndpoint (element : Element, opts : Options, data : Object) : Endpoint
      Purpose: Draws & Returns a new endpoint for the element.
      Arguments:
        element  Element  The element to add the endpoint to
        opts     Options  Options for drawing the endpoint. See Options below
        data     Object   A list of key-value pairs to add as data to the endpoint.
                            Each will be added to the created DOM elements.
      Returns: The new endpoint

    disable ()
      Disables the endpoint so that no connections can be made.
    enable ()
      Enables the endpoint to allow creating connections.
    toggleClass (className : string, active : boolean)
      Purpose: Toggles a class onto the endpoint.
      Arguments:
        className  string   The class to toggle
        active     boolean  Whether to add or remove the class. Adds if true
      Returns: None
    isHovered () : boolean
      Returns: Boolean. True if the mouse is hovering over the element.
    remove ()
      Deletes the endpoint.

    Options:
      connector  Variant          Connector type to use. See JsPlumb documentation:
                                    https://jsplumbtoolkit.com/community/doc/connectors.html
      
    Read-Only Properties:
      .uuid    string        The ID of the endpoint
      .jq      JQueryObject  JQuery Object representing the endpoint's canvas element
      .canvas  DOMElement    The endpoint's canvas element

    NOTE: JQuery methods can be called on this endpoint, which will be redirected
            to the endpoint's canvas.
*/
/*jshint esversion: 6 */ 'use strict';

class PlumbEndpoint {
  static get nextId () {
    return PlumbEndpoint.id ++;
  }

  constructor (element, opts, data, ...a) {
    this.elem = element;

    this.id = "uu" + PlumbEndpoint.nextId
    this.endpoint = this.drawEndpoint (element, opts, data, ...a);

    return new Proxy (this, PlumbEndpoint.proxy);
  }

  get jq () { return $(this.canvas); }

  drawEndpoint (element, opts, data) {
    // draw the endpoint
    var ep = jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      maxConnections: 1,
      connector: opts.connector || ["Straight", {gap: 0}],
      uuid: this.id
    }, opts);

    // add the endpoint class
    var $cv = $ (ep.canvas);
    $cv.addClass("jsp-endpoint");

    // add him to event handling
    if (typeof ENDPOINT_EVENTS_ID !== "undefined")
      control.addToEvent (ep.canvas, ENDPOINT_EVENTS_ID);

    // add in additional data
    if (data){
      for (var key in data){
        $cv.data (key, data[key]);
        $cv.children ().data (key, data[key]);
      }
    }

    return ep;
  }

  get canvas () { return this.endpoint.canvas; }
  get uuid(){ return this.endpoint.getUuid(); }
  getEndpoint () { return this.endpoint; }

  setEnabled(t){ this.endpoint.setEnabled(t); }
  disable(){ this.setEnabled (false); }
  enable(){ this.setEnabled (true); }

  remove () {
    jsPlumb.deleteEndpoint (this.endpoint);
  }

  toggleClass (cln, active) {
    $(this.canvas).toggleClass (cln, active);
  }

  isHovered () {
    if ($(this.canvas).is(":hover")) return true;

    // do we have connections? if not, we're not being hovered ...
    var conn = this.endpoint.connections;
    if (!conn || conn.length === 0) return false;

    // does our connection connect to an element?
    //   if yes => not being dragged. not hovered
    //   if no  => draggy. waggy.
    var cn = conn [0];
    var targDiv = cn.target ? cn.target : $("#" + cn.targetId);
    if (!targDiv) return true;

    var elements = control.view.getElement (targDiv);
    if (!elements) return true;

    // no other cases, so we're not being hovered over
    return false;
  }
}

PlumbEndpoint.id = 123123;


PlumbEndpoint.proxy = {
  get: function (target, name) {
    // basically - If you call a method here that doesn't exist, it's probably because
    //             its for elements. Something like Element.data (), which should be valid.
    //             This fixes that.
    if (name in target) return target [name];

    return contextualize (target.canvas, $(target.canvas) [name]);
  }
}
