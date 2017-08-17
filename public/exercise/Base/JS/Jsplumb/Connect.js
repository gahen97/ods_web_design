/*
  This controls programmatically drawing JSPlumb Connections.

  Documentation:
    constructor (e1 : Element, e2 : Element, opts : Options)
      Arguments:
        e1    Element  The element to draw the connection from (source)
        e2    Element  The element to draw the connection to (target)
        opts  Options  Options for the connection (see Options, below)
      repaint ()
        Repaints/updates the connection (after element movement, for example)
      remove ()
        Deletes the connection

    Options
      endpoint   DOMElement       The endpoint to use as the source for the connection.
      target     DOMElement       The target endpoint to use for the connection.
      overlays   Array of String  Overlays to use for the connection. See Overlays, below
      classes    Array of String  List of classes to add to the connection.
      connector  Variant          Connector type to use. See JsPlumb documentation:
                                    https://jsplumbtoolkit.com/community/doc/connectors.html
      uuid       String           The UUID to assign to the connection. See JsPlumb:
                                    https://jsplumbtoolkit.com/community/doc/draggable-connections-examples.html

    Overlays
      "Arrow"    Draw an arrow pointing to the target endpoint.

*/

/*jshint esversion: 6 */ 'use strict';

const PLUMB_OVERLAY_OPTIONS = {
  arrow: [ "Arrow", { width: 10, length: 12, location: 1, id: "arrow"} ]
};

// this is more for outside usage ....
const OVERLAY = {
  ARROW: PLUMB_OVERLAY_OPTIONS.arrow
};

class PlumbConnect {
  constructor(e1, e2, opts){
    if (!opts) opts={};
    this.uuid       = opts.uuid;
    this.startpoint = opts.endpoint || e1.getElementDiv ();
    this.endpoint   = opts.target || e2.getElementDiv ();

    this.elements = [e1, e2];

    this.overlays = [ ];
    if (opts.overlays) {
      this._addOverlays (opts.overlays);
    }

    this.detachable = true;
    this.classes = opts.classes ? this._classesFrom (opts.classes) : DEF_PLUMB_CLASS;
    this.connection = this.drawConnect(opts);
  }

  /* ---- CONSTRUCTOR - OPTION HELPERS ----- */
  _addFrom (selectors, types) {
    var resArray = [ ];
    for (var type in types)
      if (selectors [type])
        resArray.push (selectors [type]);
    return resArray;
  }

  _addOverlays (overlaySelectors) {
    if (!overlaySelectors) return;

    this.overlays = this._addFrom (PLUMB_OVERLAY_OPTIONS, overlaySelectors);
  }

  _classesFrom (classes) {
    return classes.join (" ");
  }

  /* ---- DRAWING ---- */
  drawConnect (opts)
  {
    var conn;

    try{
      conn = jsPlumb.connect({
        uuids: this.uuid,
    		source: this.startpoint,
    		target: this.endpoint,
    		overlays: this.overlays,
    		cssClass: this.classes,
    	  detachable: this.detachable,

        connector: opts.connector || [ "Straight" ],
        endpoint: ["Dot", {cssClass: "no-visibility"}],
        anchors: [
          [ "Perimeter", { shape:"Rectangle" } ]
        ]
    	});
    } catch (e) {
    }
    return conn;
  }

  repaint ()
  {
    jsPlumb.repaint (this.connection);
  }

  remove ()
  {
    if (this.connection && this.connection.connector)
      jsPlumb.deleteConnection (this.connection);

    for (var e in this.elements){
      if (this.elements [e].removePlumb)
        this.elements [e].removePlumb (this);
    }
  }

  get jq () {
    return $(this.connection.canvas);
  }
}

jsPlumb.importDefaults({
  Anchor : [ "Perimeter", {shape: "Rectangle"}]
});
