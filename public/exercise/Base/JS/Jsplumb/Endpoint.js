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

  get uuid () {
    return this.id;
  }

  get jq () { return $(this.canvas); }

  drawEndpoint (element, opts, data) {
    // draw the endpoint
    var ep = jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      maxConnections: 1,
      connector: ["Straight", {gap: 0}],
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
