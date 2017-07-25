/*
  Treap.

  In addition to being a binary search tree, the nodes in a Treap also obey the heap property:
    At every node u except root, u.parent.p < u.p
*/

class Treap extends BinarySearchTree {
  /* ----- OPS ------ */
  add (x, priority) {
    priority = (priority === undefined) ? this.getRandomPriority () : priority;
    var node = new Node (x, priority); // TODO

    if (super._add (x, node)){
      this.bubbleUp (node);
      return true;
    }

    return false;
  }

  remove (x) {
    var u = this._find (x);

    if (u){
      this.trickleDown (u);
      this.splice (u);
      return true;
    }

    return false;
  }

  /* ---- ROTATIONS ----- */
  rotateLeft (u) {
    if (!u || !u.right) return false;
    var w = u.right;

    if (u.parent)
      if (u.parent.left === u)
        u.parent.left = w;
      else
        u.parent.right = w;

    u.right = w.left;
    w.left  = u;

    if (u === this.root){
      this.root = w;
      w.parent  = null;
    }
  }

  rotateRight (u) {
    if (!u || !u.left) return false;
    var w = u.left;
    if (u.parent)
      if (u.parent.left === u)
        u.parent.left = w;
      else
        u.parent.right = w;

    u.left  = w.right;
    w.right = u;

    if (u === this.root){
      this.root = w;
      w.parent  = null;
    }
  }


  /* ---- MOVING NODES UP/DOWN ---- */
  bubbleUp (node) {
    while (node.parent && node.parent.p > node.p) {
      if (node.parent.right === node)
        this.rotateLeft (node.parent);
      else
        this.rotateRight (node.parent);
    }

    if (!node.parent)
      this.root = node;
  }

  trickleDown (u) {
    while (u.left && u.right) {
      if (!u.left)
        this.rotateLeft (u);
      else if (!u.right)
        this.rotateRight (u);
      else if (u.left.p < u.right.p)
        this.rotateRight (u);
      else
        this.rotateLeft (u);
      if (u === this.root)
        this.root = u.parent;
    }
  }


  /* ---- OVERLOADING SUBCLASS ----- */
  getCloneParams (data, node) {
    return [data, node.p];
  }
  makeNode (x, p) {
    return super.makeNode (new Node (x, p));
  }

  equals (other) {
    // must have all the sub-class stuff
    if (!super.equals (other)) return false;

    // should also obey heap property: at every node u except the root,
    //   u.parent.p < u.p
    // we have a few ways of checking this ... i'm going to check to see
    //  that other does obey heap property, and assume its fine.
    return (other.obeysHeapProperty);
  }

  get obeysHeapProperty ()
  {
    // Go through every node and check node.u < node.parent.u
    var result = true;
    Traversal.breadthFirst (this, function(_, node){
      var parent = node.parent;
      if (!parent) return;

      if (node.p < parent.p)
        result = false;

      // note that at this point we can return, but would take a lot of extra
      //   code - so for now leaving that off
    });

    return result;
  }

  /* ----- FOR QUESTIONS, HELPERS ---- */
  getRandomPriority ()
  {
    return ODSRandom.getRandom ();
  }
}
