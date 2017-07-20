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
    // draw the endpoint
    var ep = jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      maxConnections: 1,
      connector: ["Straight", {gap: 0}],
      uuid: this.id
    }, o);

    // add the side (left or right) for the endpoint
    var $cv = $(ep.canvas);
    $ (ep.element).data ("side", s);
    $cv.data ("side", s).addClass("jsp-endpoint");

    // add him to event handling
    control.addToEvent (ep.canvas, ENDPOINT_EVENTS_ID);

    // add in additional data
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
