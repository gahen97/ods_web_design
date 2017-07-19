class Control extends ControlBase {
  constructor(){
    super();

    this.userDataArray = [ ];
  }

  restart(){
    this.setActiveElement (null);
    this.updateActiveQuestion ();
    this.userDataArray = [ ];

    //this.userModel = this.exercise.getCurrQuestion ().getModel ().copy ();
  }

  removeElement (e) {
    // remove from the user model
    var id    = this.view.getIdFromElementDiv (e);
    if (id) this.userModel.removeById (id);

    super.removeElement (e);
  }

  setRootActive (arg) {
    var root = this.userModel.getRoot ();
    var elem = root && this.view.findFromNid (root.id);
    if (!elem) return;

    elem.setCSA (arg !== false);
  }

  setActiveElement (element) {
    if (!element)
      return super.setActiveElement (element);

    if (!this.canSetActive (element)) return false;
    if (!this.activeElement)
      this.setRootActive (false);

    // store the node in our user data array
    var node = this.findNodeFrom (element);
    if (!node) return false;

    this.userDataArray.push (node);
    element.addClass ("path-node");

    // do our stuff
    super.setActiveElement (element);
  }

  canSetActive (element) {
    if (!element) return false;
    if (!element.canSetActive ()) return false;
    return super.canSetActive ();
  }

  findNodeFrom (element) {
    if (!element) return null;
    if (!element.nodeId) return null;
    return this.userModel._findById (element.nodeId);
  }

  findElemFrom (node) {
    if (!node) return null;
    return this.view.findFromNid (node.id);
  }
}
