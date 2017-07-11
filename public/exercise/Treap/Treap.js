/*
  Treap.

  In addition to being a binary search tree, the nodes in a Treap also obey the heap property:
    At every node u except root, u.parent.p < u.p
*/

class Treap extends BinarySearchTree {
  /* ----- OPS ------ */
  add (x) {
    var node = new Node (x, Math.random ()); // TODO

    if (super._add (x, node)){
      this.bubbleUp (node);
      return true;
    }

    return false;
  }

  remove (x) {
    var u = this.find (x);

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
        rotateLeft (u);
      else if (!u.right)
        rotateRight (u);
      else if (u.left.p < u.right.p)
        rotateRight (u);
      else
        rotateLeft (u);
      if (u === this.root)
        this.root = u.parent;
    }
  }
}
