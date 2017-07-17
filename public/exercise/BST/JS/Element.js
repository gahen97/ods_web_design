/*
  Everything for Elements that'd likely change between exercises.
  DOM Related stuff
*/

class Element extends ElementBase {
  constructor(value, args){
    super (...arguments);

    console.log(args);

    // Anything else that needs to be done for Elements
    this.plumbs = [ ];
    this.level  = args.level || 0;
    this.maxLev = args && args.maxDepth;
  }

  get targUuid () { return this.target.uuid; }

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
    super.remove ();

    for (var i in this.plumbs)
      this.plumbs [i].remove ();

    this.leftEndpoint.remove();
    this.rightEndpoint.remove();
  }

  setActive (isActive) {
    // Activate this element. Adds a class to represent being active
      var element = $(this.element);
      if (isActive)
        element.addClass ("active");
      else
        element.removeClass ("active");
  }

  moveTo (offset) {
    // Move to some given position
    // TODO this is hacky and bad
    $ (this.element).offset (offset);
  }

  moveUp () {
    if (this.level <= 0) return false;
    this.level --;
    this.moveTo ({
      top: this.level * LEVEL_HEIGHT
    })

    jsPlumb.repaintEverything();
  }

  moveDown () {
    if (this.level >= this.maxLev) return false;
    this.level ++;
    this.moveTo ({
      top: this.level * LEVEL_HEIGHT
    })

    jsPlumb.repaintEverything();
  }

  addControls (e) {
    // If there are any controls needed - draggable, droppable, ... -
    //   add them here. If given, e is the element
    this.draggy_waggy = new JsPlumbDraggable (this, e);
    this.leftEndpoint = new JsPlumbEndpoint (e, {
      anchor: "BottomLeft",
      parameters: {
        side: DIRECTION_LEFT
      }
    }, DIRECTION_LEFT);
    this.rightEndpoint = new JsPlumbEndpoint (e, {
      anchor: "BottomRight",
      parameters: {
        side: DIRECTION_RIGHT
      }
    }, DIRECTION_RIGHT)
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
}
