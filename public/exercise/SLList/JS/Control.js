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
    var include  = this.userModel.accessibleFrom (this.newestNode);
    for (var index in inactive) {
      var node = inactive [index];
      if (include.indexOf(node) !== -1) continue;

      var e    = node && this.view.getElementFromNodeId (node.id);
      if (!e || node===this.newestNode) continue;

      e.disable ();
    }
  }
}
