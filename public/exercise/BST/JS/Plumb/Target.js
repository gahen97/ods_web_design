class JsPlumbTarget {
  constructor (e, eObj) {
    this.elem    = e;
    this.elemObj = eObj;

    this.plumbed = this.makeTarget (e);
  }

  makeTarget (element) {
    if (!element) element = this.elem;
    if (!element) return false;

    return jsPlumb.makeTarget (element, {
      isSource: false,
      isTarget: true,
      maxConnections: 1,
      endpoint: [ "Dot", {radius:5, cssClass: "no-visibility"} ],
      cssClass: "jsplumb-target no-visibility"
    })
  }
}
