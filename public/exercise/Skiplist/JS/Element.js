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

  hideValue () {
    $ (".value", this.element).addClass("hidden");
  }
  
  connectTo (otherElem, opts) {
    if (!otherElem) return false;
    if (!opts) opts = { };

    var endpoint = this.pointer;
    var myUuid   = endpoint.uuid;
    var trgUuid  = otherElem.targUuid;

    if (endpoint){
      endpoint = endpoint.canvas;
    }

    var newConnection = new PlumbConnect (
      this,
      otherElem,
      {
       overlays: "arrow",
       classes: ["jsplumb-connection", "plumba-wumba"],
       parameters: {
          srcElement: this
       },
       uuid: [myUuid, trgUuid],
       connector: opts.connector
     });
  }

  remove () {
    this.pointer.remove ();
    jsPlumb.remove (this.element);
  }

  toggleClass (className, active) {
    $(this.element).toggleClass (className, active);
    this.pointer.toggleClass (className, active);

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
    if (this.pointer) this.pointer.setEnabled(t);
    if (this.target) this.target.setEnabled(t);
  }
  disable () { this.setEnabled(false); }
  enable(){ this.setEnabled(true); }

  isHovered(){
    return this.jq.is(":hover") ||
           this.pointer.isHovered();
  }

  moveTo (offset) {
    // Move to some given position
    $ (this.element).offset (offset);
  }

  addControls (e, args) {
    var target = e;
    var ptr    = $ (".pointer", e);

    // make draggable
    if (args.draggable !== false)
      this.draggy_waggy = new PlumbDraggable (this, e);

    // make target
    this.target       = new PlumbTarget (target, this, {
      anchor: [0, 0.5, 0, 0],
      maxConnections: 3,
      canEnable: args.target !== false
    }, {element: this});

    // make next pointer
    if (args.pointer !== false)
      this.pointer      = new PlumbEndpoint (ptr, {
        anchor: [0.6, 0.55, 0, 0],
        connectorOverlays: [OVERLAY.ARROW],
        connector: args.connector
      }, {element: this})
  }
}
