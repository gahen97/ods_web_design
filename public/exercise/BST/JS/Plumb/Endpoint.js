class JsPlumbEndpoint {
  static get nextId () {
    return JsPlumbEndpoint.id ++;
  }

  constructor (element, opts, side) {
    this.elem = element;

    this.id = "eww-eww" + JsPlumbEndpoint.nextId
    this.endpoint = this.drawEndpoint (element, opts, side);
  }

  get uuid () {
    return this.id;
  }

  drawEndpoint (element, o, s) {
    var ep = jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      cssClass: "jsplumb-endpoint",
      maxConnections: 1,
      connector: "Straight",
      uuid: this.id
    }, o);

    $ (ep.element).data ("side", s);
    $ (ep.canvas).data ("side", s);

    return ep;
  }

  get canvas () { return this.endpoint.canvas; }
  get uuid(){ return this.endpoint.getUuid(); }
  getEndpoint () { return this.endpoint; }
  remove () {
    jsPlumb.deleteEndpoint (this.endpoint);
  }
}

JsPlumbEndpoint.id = 123123;
