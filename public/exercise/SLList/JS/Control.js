class Control extends ControlBase {
  constructor(){
    super();

    // other control stuff
    this.newestNode = null;
  }

  // overload base stuff here, add more stuff, whatevers
  connect (sourceNode, targetNode) {
    this.userModel.connect (sourceNode, targetNode);
  }
  addNode (data) {
    var n = this.userModel.create (parseInt (data));
    this.newestNode = n;
    return n.id;
  }


  update(){
    // find every element that cannot be accessed
    // and add 'disabled' to it ...
    var inactive = this.userModel.nodesOut ();
    for (var index in inactive) {
      var node = inactive [index];
      var e    = node && this.view.getElementFromNodeId (node.id);
      if (!e || e===this.newestNode) continue;

      e.disable ();
    }
  }
}
