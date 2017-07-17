class JsPlumbTarget {
  static get nextId(){ return JsPlumbTarget.id ++; }

  constructor (e, eObj) {
    this.elem    = e;
    this.elemObj = eObj;

    this.id = "jim-" + JsPlumbTarget.nextId;
    this.plumbed = this.makeTarget (e);
  }

  makeTarget (element) {
    if (!element) element = this.elem;
    if (!element) return false;

    return jsPlumb.makeTarget (element, {
      isSource: false,
      isTarget: true,
      maxConnections: 1,
      endpoint: [ "Dot", {radius:5} ],
      cssClass: "jsplumb-target no-visibility",

      id: this.id
    })
  }

  get uuid() { return this.plumbed.getId(); }
}

JsPlumbTarget.id = 1230;
