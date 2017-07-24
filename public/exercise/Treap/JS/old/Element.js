/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(value, args){
    if (!args) args={};
    super (...arguments);

    // Anything else that needs to be done for Elements
    this.plumbs = [ ];
    this.level  = args.level || 0;
    this.maxLev = args && args.maxDepth;
    this.nid    = args && args.nodeId;
    this._node  = args && args.node;

    this._priority = this._node.p;
  }

  get targUuid () { return this.target.uuid; }
  get nodeId () { return this.nid; } // node.nodeId
  set nodeId (d) { this.nid = d; } // node.nodeId = x; node.nodeId(x)
  set node (n) { this._node = n; }
  get node () { return this._node; }
  get priority () { return this._priority; }

  getLevel(){ return this.level; }

  generate () {
    var elementDiv = $(ELEMENT_TEMPLATE).clone ();
    var model      = $(MODEL_DISPLAY);
    var span       = $("span", elementDiv);

    // set the text ...
    span.text (this.value).data ("id", this.id);

    // parent it to the main div, add the stuff, return
    elementDiv.insertAfter (model).data ("id", this.id);

    this.addControls (elementDiv, MODEL_BODY + " div");

    return elementDiv;
  }

  remove () {
    for (var i in this.plumbs)
      this.plumbs [i].remove ();

    this.leftEndpoint.remove();
    this.rightEndpoint.remove();

    jsPlumb.remove (this.element);

    return this;
  }

  toggleClass (className, active) {
    $(this.element).toggleClass (className, active);
    this.leftEndpoint.toggleClass (className, active);
    this.rightEndpoint.toggleClass (className, active);

    return this;
  }

  addClass (className) {
    return this.toggleClass (className, true);
  }

  setActive (isActive) {
    // Activate this element. Adds a class to represent being active
      $(this.element).toggleClass ("active", isActive);
      this.leftEndpoint.toggleClass ("jsplumb-endpoint-active", isActive);
      this.rightEndpoint.toggleClass ("jsplumb-endpoint-active", isActive);

      // TODO BAD CODE
      if (!this.node) return;
      var left  = this.node.left;
      var right = this.node.right;

      var lNode = left && control.findElemFrom (left);
      var rNode = right && control.findElemFrom (right);

      if (lNode)
        lNode.setCSA (isActive);
      if (rNode)
        rNode.setCSA (isActive);

      return this;
  }

  canSetActive () {
    return (this.hasClass ("can-set-active"));
  }

  setCSA (c) {
    return this.toggleClass ("can-set-active", c);
  }

  moveTo (offset) {
    // Move to some given position
    // TODO this is hacky and bad
    $ (this.element).offset (offset);
    return this;
  }

  moveUp () {
  //  if (this.level <= 0) return false;
    this.level --;
    this.moveTo ({
      top: this.level * LEVEL_HEIGHT
    })

    jsPlumb.repaintEverything();
    return this;
  }

  moveDown () {
  //  if (this.level >= this.maxLev) return false;
    this.level ++;
    this.moveTo ({
      top: this.level * LEVEL_HEIGHT
    })

    jsPlumb.repaintEverything();
    return this;
  }

  isHovered(){
    return this.jq.is(":hover") ||
          this.leftEndpoint.isHovered () ||
          this.rightEndpoint.isHovered ();
  }

  addControls (e) {
    // If there are any controls needed - draggable, droppable, ... -
    //   add them here. If given, e is the element
    this.draggy_waggy = new JsPlumbDraggable (this, e);
    this.leftEndpoint = new JsPlumbEndpoint (e, {
      anchor: [ 0.3, 0.7, 0, 1 ],
      cssClass: "jspe",
      parameters: {
        side: DIRECTION_LEFT
      }
    }, DIRECTION_LEFT, {
      element: this
    });
    this.rightEndpoint = new JsPlumbEndpoint (e, {
      anchor: [ 0.7, 0.7, 0, 1 ],
      cssClass: "jspe",
      parameters: {
        side: DIRECTION_RIGHT
      }
    }, DIRECTION_RIGHT, {
      element: this
    })
    this.target = new JsPlumbTarget (e, this);
  }

  setDraggable (t) {
    this.draggy_waggy.setDraggable (t);
  }

  addPlumb (p) {
    this.plumbs.push (p);
  }

  removePlumb (p) {
    var index = this.plumbs.indexOf (p);
    if (index > -1) this.plumbs.splice (index, 1);
  }

  repaint () {
    for (var p in this.plumbs)
      this.plumbs[p].repaint ();
  }

  connectTo (otherElem, direction) {
    if (!otherElem) return false;

    var endpoint;
    if (direction === DIRECTION_LEFT)
      endpoint = this.leftEndpoint;
    else
      endpoint = this.rightEndpoint;

    var myUuid  = endpoint.uuid;
    var trgUuid = otherElem.targUuid;

        if (endpoint){
          endpoint = endpoint.canvas;
        }


    var newConnection = new PlumbConnect (this,
                                          otherElem,
                                          {
                                           overlays: "arrow",
                                           classes: ["jsplumb-connection", "plumba-wumba"],
                                           parameters: {
                                              side: direction,
                                              srcElement: this
                                           },
                                           uuid: [myUuid, trgUuid]
                                          }).setDirection (direction);
    this.addPlumb (newConnection);
    otherElem.addPlumb (newConnection);
  }

  // Animations!
  jqify(){
    var elems = [this.jq [0]];
    for (var i in this.plumbs)
      elems.push (this.plumbs [i].jq [0]);
    return $(elems);
  }

  fadeIn () {
    var elems = this.jqify ();
    elems.stop ();
    elems.css({display: 'none'});
    elems.fadeIn.apply (elems, arguments);
  }

  fadeOut () {
    var elems = this.jqify ();
    elems.stop ();
    elems.fadeOut.apply (elems, arguments);
  }
}
