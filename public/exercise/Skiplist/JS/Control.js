class Control extends ControlBase {
  constructor(){
    super();

    // other control stuff
    this.newestNode = null;
    this.userDataArray = [ ];
  }

  canSetActive (element)
  {
    if (!this.view.canSetActive (element)) return false;
    return super.canSetActive (element);
  }
  setActiveElement(e){
    if (!this.canSetActive (e)) return false;

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

  get tail(){ return this.userModel.tail; }
  get head(){ return this.userModel.head; }

  // overload base stuff here, add more stuff, whatevers
  connect (sourceNode, targetNode) {
    this.userModel.connect (sourceNode, targetNode);
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
    var nextActive1;
    if (activeNode) nextActive1 = activeNode.next;

    return [
      this.head,
      this.tail,
      activeNode,
      nextActive1,
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
