/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(value, args){
    super (...arguments);

    // Anything else that needs to be done for Elements
    this.nodeId = args.nodeId;

    this.initClasses (args);
  }

  get targUuid () { return this.target.uuid; }

  generate (args) {
    // Create a new div to represent the element,
    //   returning the new div
    var div        = $(ELEMENT_TEMPLATE).clone ();
    var model      = $(MODEL_DISPLAY);

    $("span", div).text (this.value)

    // give the element ID
    div.find("*").data("id", this.id);
    div.data ("id", this.id);

    div.insertAfter (model);
    this.addControls (div, args);

    return div;
  }

  makeConnection (from, to, opts) {
    if (!from || !to) return false;
    if (!opts) opts = { };

    var fromUuid = from.uuid;
    var trgUuid  = to.uuid;

    return new PlumbConnect (
      this,
      to,
      {
        overlays: "arrow",
        classes: ["jsplumb-connection", "plumba-wumba"],
        parameters: {
          srcElement: this
        },
        uuid: [fromUuid, trgUuid],
        connector: opts.connector
      }
    );
  }
  connectNext (otherElem, opts) {
    return this.makeConnection (this.nextPointer, otherElem, opts);
  }
  connectPrev (otherElem, opts) {
    return this.makeConnection (this.prevPointer, otherElem, opts);
  }

  remove () {
    this.nextPointer.remove ();
    this.prevPointer.remove ();
    jsPlumb.remove (this.element);
  }

  toggleClass (className, active) {
    $(this.element).toggleClass (className, active);
    this.nextPointer.toggleClass (className, active);
    this.prevPointer.toggleClass (className, active);

    return this;
  }

  addClass (className) { return this.toggleClass (className, true); }
  removeClass (className){ return this.toggleClass (className, false); }

  initClasses (args) {
    if (args.draggable !== false)
      this.addClass ("draggable");
  }

  setActive (isActive) {
    // Activate this element. Adds a class to represent being active
    this.toggleClass ("jsp-active", isActive);
    $ (this.element).children().toggleClass ("active", isActive);
  }

  // DISABLE
  disableTarget(){
    if (this.target) this.target.disable();
  }
  setEnabled(t) {
    this.toggleClass ("disabled", !t);
    if (this.nextPointer) this.nextPointer.setEnabled(t);
    if (this.prevPointer) this.prevPointer.setEnabled(t);
    if (this.target) this.target.setEnabled(t);
  }
  disable () { this.setEnabled(false); }
  enable(){ this.setEnabled(true); }

  isHovered(){
    return this.jq.is(":hover") ||
           this.nextPointer.isHovered() ||
           this.prevPointer.isHovered();
  }

  moveTo (offset) {
    // Move to some given position
    $ (this.element).offset (offset);
  }

  addControls (e, args) {
    var target  = e;
    var nextptr = $ (".pointer.next", e);
    var prevptr = $ (".pointer.previous", e);

    // make draggable
    if (args.draggable !== false)
      this.draggy_waggy = new PlumbDraggable (this, e);

    // make target
    this.target       = new PlumbTarget (target, this, {
      anchor: [ "Perimeter", { shape:"Square", anchorCount:150 }],
      maxConnections: 3,
      canEnable: args.target !== false
    }, {element: this});

    // make next pointer
    if (args.pointer !== false){
      this.nextPointer = this.makeEndpoint (nextptr, args, SIDE_NEXT);
      this.prevPointer = this.makeEndpoint (prevptr, args, SIDE_PREV);
    }
  }

  makeEndpoint (ptr, args, type) {
    return new JsPlumbEndpoint (ptr, {
      anchor: [0.6, 0.55, 0, 0],
      connectorOverlays: [OVERLAY.ARROW],
      connector: args.connector,
      parameters: {
        type: type
      }
    }, type, {element: this})
  }
}
