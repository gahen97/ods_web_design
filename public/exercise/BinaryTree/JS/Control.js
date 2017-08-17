class Control extends ControlBase {
  constructor(){
    super();

    this.userDataArray = [ ];
  }

  reset(){
    this.setActiveElement (null);
    this.userDataArray = [ ];
    this.view.reset ();
    this.exercise.reset();
  }

  restart(){
    this.updateActiveQuestion ();
    this.reset ();

    //this.userModel = this.exercise.getCurrQuestion ().getModel ().copy ();
  }

  get model () { return this.userModel; }

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
    console.log (this.activeElement, element, this.activeElement && element && this.activeElement.id === element.id);
    if (this.activeElement && element && this.activeElement.id === element.id) {
      element = null;
      console.log (this.userDataArray);
      this.userDataArray.pop ();
      console.log (this.userDataArray);
    }

    if (!element)
      return super.setActiveElement (element);

    if (!this.canSetActive (element)) return false;
    if (!this.activeElement)
      this.setRootActive (false);
    else
      this.activeElement.addClass ("path-node").addClass("path-node-plumb");


    // store the node in our user data array
    var node = this.findNodeFrom (element);
    if (!node) return false;

    this.userDataArray.push (node);

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

  // NOTE: Path should be an array of nodes in some model matching our own.
  //       eachFunc is optional, will be called through every iteration of our loop
  //         and sent each node on the path to our result (does not include result).
  findNodeFromPath (path, eachFunc) {
    if (!path) return null;
    if (!eachFunc) eachFunc = function(){};

    // Walk through every node in the path, starting from our own root.
    var prevNode = this.userModel.getRoot ();
    for (var i = 1; i < path.length; i++){
      eachFunc (prevNode);

      // Find the next node and move to it
      var node = this.findNextNodeFrom (prevNode, path [i]);
      prevNode = node;
    }

    return prevNode;
  }

  getElementsForRoute (path) {
    // The idea here is that we're given a path and we want to route it to our model,
    //   then route that to findElemsFrom (nodes).
    // To map to our model, we should go through, check left/right, see which matches.
    //   Note it is entirely possible this will still break down, but it's less likely.
    if (!path) return [ ];
    var usersPath = [];

    usersPath.push (this.findNodeFromPath (path, (e)=>{
      usersPath.push (e);
    }))

    return this.findElemsFrom (usersPath);
  }

  // NOTE: Here, we run a traversal and return the result as an array.
  // This assumes the argument is a function taking (tree, f(data, node)),
  //   as do all the Traversal functions.
  traverse (traversal) {
    var path = [ ];

    traversal (this.userModel, (data, node)=>{
      path.push (node);
    });

    return this.findElemsFrom (path);
  }

  // NOTE: This is similar to above but calls a function instead,
  //       if the function returns true adds the node to the list
  matchingElements (f) {
    var nodes = [ ];

    Traversal.preorder (this.userModel, (data, node, ...args)=>{
      if (f(data, node, ...args))
        nodes.push (node);
    });

    return this.findElemsFrom (nodes);
  }

  getRoot(){ return this.findElemsFrom ([this.userModel.root]); }
  pathTo(x){ return this.findElemsFrom (this.userModel.pathTo (x)); }
}
