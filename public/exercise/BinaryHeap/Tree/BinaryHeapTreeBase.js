/*
  NOTE:
    Although this is similar to the Binary Search Tree, there's many methods that
      cannot be used ... so this is an altered version of it
*/
/*jshint esversion: 6 */ 'use strict';

class BHeapTree extends Model {
  constructor(root)
  {
    super();

    this.root = root || null;
    this.n    = this.root ? this._size (this.root) : 0;

    this.nodesById = { };
  }

  /* ---- [PRIVATE] - HELPER FUNCTIONS ---- */
  _size (u) {
    if (!u) return 0;
    return 1 + this._size (u.left) + this._size (u.right);
  }

  _height (u) {
    if (!u) return -1;
    return Math.max (this._height (u.left), this._height (u.right)) + 1;
  }

  _findById (id) {
    return this.nodesById [id];
  }

  /* --- PATTERNS --- */
  parent(i){ return Math.floor ((i-1)/2); }
  left  (i) { return 2 * i + 1; }
  right (i) { return 2 * i + 2; }

  isLeft (i) {
    // if it's a left child, will be odd based off of left() above ...
    return (i % 2) === 1;
  }

  /* ---- TERMINOLOGY ----- */
  // NOTE: Gonezo

  /* ---- OPERATIONS ----- */
  // NOTE: This is all removed as BinaryHeaps don't use them ...
  // And there wouldn't be a good way to do this without an array

  /* ------ USER MODEL ------ */
  makeNode (x) {
    var newNode = new Node (x);
    this.nodesById [newNode.id] = newNode;
    return newNode;
  }

  getRoots () {
    var roots = [ ];

    for (var i in this.nodesById){
      var n = this.nodesById [i];
      if (n && !n.parent)
        roots.push (n);
    }

    return roots;
  }
  getRoot () { return this.root; }

  getTrees() {
    var roots = this.getRoots ();
    var trees = [ ];
    for (var i in roots) // TODO
      trees.push (new __TREEMODULENAME__ (roots [i]));
    return trees;
  }

  // What does stEM do?
  // It did something, for sure.
  stEM (d1Id, d2Id) {
    var n1 = this._findById (d1Id);

    // If n1 doesn't exist, we can't set left.
    if (!n1) return false;

    // If d2Id is null, we want to set to null ;
    // Otherwise, expect node ID exists & return it
    var n2;
    if (d2Id === null) n2 = null;
    else n2 = this._findById (d2Id);

    return {
      n1: n1,
      n2: n2
    };
  }

  setLeft (d1Id, d2Id) {
    var nodes = this.stEM (d1Id, d2Id);
    if (!nodes) return false;

    var n1 = nodes.n1;
    var lc = n1 && n1.left;
    if (lc)
      lc.parent = null;

    nodes.n1.left = nodes.n2; // TODO black magic
    return nodes.n2;
  }

  setRight (d1Id, d2Id) {
    var nodes = this.stEM (d1Id, d2Id);
    if (!nodes) return false;

    var n1 = nodes.n1;
    var rc = n1 && n1.right;
    if (rc)
      rc.parent = null;

    n1.right = nodes.n2;
    return nodes.n2;
  }

  findId (id) { return this.nodesById [id]; }

  removeById (id) {
    var node = this.findId (id);
    if (!node){
      console.error ("node not found: ", id);
      return false;
    }

    // if it has a left child, remove child's parent
    if (node.left){
      node.left.parent = null;
      node.left = null;
    }

    // if it has a right child, remove child's parent
    if (node.right){
      node.right.parent = null;
      node.right = null;
    }

    // if it has a parent, remove this child
    if (node.parent){
      if (node.parent.left === node)
        node.parent.left = null;
      else if (node.parent.right === node)
        node.parent.right = null;
      node.parent = null;
    }

    // remove node
    this.nodesById [id] = null;
  }

  /* ----- PRE-CALCULATIONS ------ */
  // gonezo ...

  /* ------ EXERCISE STUFF ------ */
  equals(other)
  {
    if (!other) return false;

    var check     = function (node, other) {
        if (!node && !other) return true;
        if (!node || !other) return false;
        return node.data === other.data;
    }
    var checkData = function(node, other) {
      if (!node && !other) return true;
      if (!node || !other) return false;

      return (check (node, other) &&
        checkData (node.left, other.left) &&
        checkData (node.right, other.right));
    }

    return checkData (this.root, other.root);
  }

  each (f)
  {
    Traversal.inorder (this, f);
  }

  toString(delim){
    if (!delim) delim = " ";
    var s = "";
    this.each ((d)=>s += d + delim);
    return s;
  }

  toArray(){
    var array = [ ];

    this.each ((data)=>
      array.push (data);
    );

    return array;
  }
}
