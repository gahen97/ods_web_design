class JsPlumbEndpoint {
  static get nextId () {
    return JsPlumbEndpoint.id ++;
  }

  constructor (element, opts) {
    this.elem = element;
    this.endpoint = this.drawEndpoint (element, opts);

    this.id = "eww-eww" + JsPlumbEndpoint.nextId
  }

  drawEndpoint (element, o) {
    return jsPlumb.addEndpoint(element, {
      isSource: true,
      isTarget: false,
      endpoint: [ "Dot", {radius:5} ],
      cssClass: "jsplumb-endpoint",
      maxConnections: 1,
      connector: "Straight",

      uuid: this.id
    }, o);
  }

  get canvas () { return this.endpoint.canvas; }
  get uuid(){ return this.id; }
  getEndpoint () { return this.endpoint; }
  remove () {
    jsPlumb.deleteEndpoint (this.endpoint);
  }
}

JsPlumbEndpoint.id = 123123;
