class Control extends ControlBase {
  constructor(){
    super();

    // other control stuff
  }

  // overload base stuff here, add more stuff, whatevers
  connect (sourceNode, targetNode) {
    this.userModel.connect (sourceNode, targetNode);
  }
  addNode (data) {
    return this.userModel.create (parseInt (data)).id;
  }
}
