const PLUMB_OVERLAY_OPTIONS = {
  arrow: [ "Arrow", { width: 10, length: 12, location: 1, id: "arrow"} ]
};

class PlumbConnect {
  constructor(e1, e2, opts){
    if (!opts) opts={};
    this.uuid       = opts.uuid;
    this.startpoint = opts.endpoint || e1.getElementDiv ();
    this.endpoint   = e2.getElementDiv ();

    this.elements = [e1, e2];

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

  setDirection (dir) {
    this.direction = dir;
    return this;
  }

  getDirection(){ return this.direction; }

  /* ---- DRAWING ---- */
  drawConnect ()
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

        connector: [ "Straight" ],
        endpoint: ["Dot", {radius: 1, cssClass: "hidden"}],
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
    jsPlumb.deleteConnection (this.connection);

    for (var e in this.elements)
      this.elements [e].removePlumb (this);
  }
}

jsPlumb.importDefaults({
  Anchor : [ "Perimeter", {shape: "Rectangle"}]
});
