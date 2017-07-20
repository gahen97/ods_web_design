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

  resetActiveElement (){
    this.setRootActive (true);
    this.userDataArray = [ ];
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

  findNextNodeFrom (prev, next) {
    if (!prev || !next) return null;
    if (prev.left && prev.left.data === next.data)
      return prev.left;

    if (prev.right && prev.right.data === next.data)
      return prev.right;

    return null;
  }

  findElemFrom (node) {
    if (!node) return null;
    return this.view.findFromNid (node.id);
  }

  findElemsFrom (nodes) {
    var res = [ ];
    for (var i in nodes)
      res.push (this.findElemFrom (nodes [i]));
    return res;
  }

  getElementsForRoute (path) {
    // The idea here is that we're given a path and we want to route it to our model,
    //   then route that to findElemsFrom (nodes).
    // To map to our model, we should go through, check left/right, see which matches.
    //   Note it is entirely possible this will still break down, but it's less likely.
    if (!path || !path.length) return [ ];
    var usersPath = [this.userModel.getRoot ()];

    for (var i = 1; i < path.length; i++)
      usersPath.push (this.findNextNodeFrom (usersPath [usersPath.length-1], path [i]));

    return this.findElemsFrom (usersPath);
  }
}
