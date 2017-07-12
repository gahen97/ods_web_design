const PLUMB_OVERLAY_OPTIONS = {
  arrow: [ "Arrow", { width: 10, length: 12, location: 1, id: "arrow"} ]
};

class PlumbConnect {
  constructor(e1, e2, opts){
    if (!opts) opts={};
    this.startpoint = e1;
    this.endpoint   = e2;

    this.overlays = [ ];
    if (opts.overlays) {
      this.addOverlays (opts.overlays);
    }

    this.detachable = false;
    this.classes = opts.classes ? this.classesFrom (opts.classes) : DEF_PLUMB_CLASS;
    this.connection = this.drawConnect();
  }

  /* ---- CONSTRUCTOR - OPTION HELPERS ----- */
  addFrom (selectors, types) {
    var resArray = [ ];
    for (var type in types)
      if (selectors [type])
        resArray.push (selectors [type]);
    return resArray;
  }

  addOverlays (overlaySelectors) {
    if (!overlaySelectors) return;

    this.overlays = this.addFrom (PLUMB_OVERLAY_OPTIONS, overlaySelectors);
  }

  classesFrom (classes) {
    return classes.join (" ");
  }

  /* ---- DRAWING ---- */
  drawConnect ()
  {
    return jsPlumb.connect({
  		source: this.startpoint,
  		target: this.endpoint,
  		overlays: this.overlays,
  		cssClass: this.classes,
  	  detachable: this.detachable,

      connector: [ "Straight" ],
      endpoint: ["Dot", {radius: 1, cssClass: "hidden"}],
      anchors: [
        [ "Perimeter", { shape:"Rectangle" } ]
      ]
  	});
  }

  reload ()
  {
    jsPlumb.repaint (this.connection);
  }

  remove ()
  {
    jsPlumb.deleteConnection (this.connection);
  }
}

jsPlumb.importDefaults({
  Anchor : [ "Perimeter", {shape: "Rectangle"}]
});
