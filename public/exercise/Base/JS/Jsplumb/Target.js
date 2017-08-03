class PlumbTarget {
  static get nextId(){ return PlumbTarget.id ++; }

  constructor (e, eObj, opts) {
    this.elem    = e;
    this.elemObj = eObj;

    this.id = "target-" + PlumbTarget.nextId;
    this.plumbed = this.makeTarget (e, opts);
  }

  makeTarget (element, options) {
    if (!options) options={};
    if (!element) element = this.elem;
    if (!element) return false;

    return jsPlumb.makeTarget (element, {
      isSource: false,
      isTarget: true,
      maxConnections: 1,
      endpoint: [ "Dot", {radius:5} ],
      cssClass: "jsplumb-target no-visibility",
      anchor: options.anchor || [0.5, 0.5, 0, 0],

      id: this.id
    })
  }

  get uuid() { return this.plumbed.getId(); }
}

PlumbTarget.id = 1230;
