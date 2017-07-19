class JsPlumbEndpoint {
  static get nextId () {
    return JsPlumbEndpoint.id ++;
  }

  constructor (element, opts, side, data) {
    this.elem = element;

    this.id = "eww-eww" + JsPlumbEndpoint.nextId
    this.endpoint = this.drawEndpoint (element, opts, side, data);

    return new Proxy (this, JsPlumbEndpoint.proxy);
  }

  get uuid () {
    return this.id;
  }

  get jq () { return $(this.canvas); }

  drawEndpoint (element, o, s, d) {
    var ep = jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      maxConnections: 1,
      connector: "Straight",
      uuid: this.id
    }, o);

    var $cv = $(ep.canvas);
    $ (ep.element).data ("side", s);
    $cv.data ("side", s).addClass("jsp-endpoint");

    control.addToEvent (ep.canvas, ENDPOINT_EVENTS_ID);

    if (d){
      for (var k in d){
        $cv.data (k, d[k]);
        $cv.children ().data (k, d[k]);
      }
    }

    return ep;
  }

  get canvas () { return this.endpoint.canvas; }
  get uuid(){ return this.endpoint.getUuid(); }
  getEndpoint () { return this.endpoint; }
  remove () {
    jsPlumb.deleteEndpoint (this.endpoint);
  }

  toggleClass (cln, active) {
    $(this.canvas).toggleClass (cln, active);
  }

  isHovered () {
    if ($(this.canvas).is(":hover")) return true;

    var conn = this.endpoint.connections;
    if (!conn || conn.length === 0) return false;

    var cn = conn [0];
    var targDiv = cn.target ? cn.target : $("#" + cn.targetId);
    if (!targDiv) return false;

    var elements = control.view.getElement (targDiv);
    if (!elements) return true;

    return false;
  }
}

JsPlumbEndpoint.id = 123123;


JsPlumbEndpoint.proxy = {
  get: function (target, name) {
    // basically - If you call a method here that doesn't exist, it's probably because
    //             its for elements. Something like Element.data (), which should be valid.
    //             This fixes that.
    if (name in target) return target [name];

    return contextualize (target.canvas, $(target.canvas) [name]);
  }
}
