class Control extends ControlBase {
  constructor(){
    super();

    // other control stuff
    this.newestNode = null;
    this.userDataArray = [ ];
  }

  reset(){ this.update(); }

  setActiveElement(e){
    // grab the previous node ... this will be for later
    var prevElem = this.activeElement;
    var prevNode = this.nodeFromElem (prevElem);

    // set the new active node
    var node = this.nodeFromElem (e);
    if (this.activeElements.indexOf (node) === -1)
      return false;

    super.setActiveElement (...arguments);
    this.update ();


    // update user data. this uses the previous node above ^
    var uda = this.userDataArray;
    if (!prevNode || prevNode.next !== node)
      uda = this.userDataArray = [ ];

    if (uda.indexOf (node) === -1)
      uda.push (node);
  }

  get dummy(){ return this.userModel.dummy; }

  // overload base stuff here, add more stuff, whatevers
  connect (sourceNode, targetNode, side) {
    switch (side) {
      case SIDE_NEXT:
        this.userModel.connectNext (sourceNode, targetNode);
        break;
      case SIDE_PREV:
        this.userModel.connectPrev (sourceNode, targetNode);
        break;
      default:
        console.error ("UNKNOWN SIDE ARGUMENT: ", side);
        return false;
    }
    
    return true;
  }
  addNode (data) {
    var n = this.userModel.create (parseInt (data));
    this.newestNode = n;
    return n.id;
  }

  // remove node
  removeElement (e) {
    var nodeId = this.view.getNodeFromElement (e);
    this.userModel.deleteNode (nodeId);

    super.removeElement (e);
  }

  elementsFromNodes (nodes) {
    var e = [ ];

    for (var i in nodes) {
      var elem = this.view.getElementFromNodeId (nodes [i].id);
      if (elem)
        e.push (elem);
    }

    return e;
  }

  getElementsForRoute (index) {
    var nodes = this.userModel.pathTo (index);
    return this.elementsFromNodes (nodes);
  }

  // find a node
  find(nid){
    return this.view.getElementFromNodeId (nid);
  }
  nodeFromElem (element) {
    var nodeId = element && element.nodeId;
    var node   = this.userModel.find (nodeId);
    return node;
  }

  get activeElements () {
    // active nodes:
    //    1) head & tail are always active
    //    2) newest node is always active
    //    3) active node & active node's next
    var activeNode = this.nodeFromElem (this.activeElement);
    var nextActive, prevActive;
    if (activeNode){
      nextActive = activeNode.next;
      prevActive = activeNode.prev;
    }

    return [
      this.dummy,
      activeNode,
      nextActive,
      prevActive,
      this.newestNode
    ];
  }

  update(){
    // helper ...
    var each = (from, f) => {
      for (var index in from) {
        var node = from [index];
        var e    = node && this.view.getElementFromNodeId (node.id);
        if (!e) continue;

        f (e, node);
      }
    }

    var active = this.activeElements;

    var inactive = this.userModel.excluding (active);
    each (inactive, (e)=>e.disable());
    each (active, (e)=>e.enable ());
  }
}
