/*
  NOTE:

    Currently, the equals() method checks if two trees are equal by the elements
      within the trees, but not by an in order analysis.
    Could probably change this to create two arrays of every element, in order,
      then check the two arrays are identical. If they're not, its an issue.
*/
/*jshint esversion: 6 */ 'use strict';

class BinarySearchTree extends Model {
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

  _add (x, newNode) {
    if (!this.root) this.root = newNode;
    else {
      var prevNode = this.findPrev (x);
      if (!prevNode || prevNode.data === x)
        return false;
      else if (prevNode.data > x)
        prevNode.left = newNode;
      else
        prevNode.right = newNode;
    }

    this.n ++;
    this.nodesById [newNode.id] = newNode;
    return true;
  }


  _find(x)
  {
    var node = this.findPrev (x);
    if (node && node.data === x)
      return node;
    return null;
  }

  _findById (id) {
    return this.nodesById [id];
  }

  _subtreeFrom (u) {
    return new BinarySearchTree (u);
  }

  /* ---- TERMINOLOGY ----- */
  size(x)
  {
    var u = (x || x === 0) ? this._find (x) : this.root;
    return this._size (u);
  }

  depth (x) {
    var node = this._find (x);
    if (!node) return -1;

    var depth = 0;
    while (node !== this.root) {
      node = node.parent;
      depth ++;
    }

    return depth;
  }

  height (x) {
    var node = x ? this._find (x) : this.root;
    if (!node) return -1;

    return this._height (node);
  }

  subtree (x) {
    var node = this._find (x);
    if (!node) return null;

    return this._subtreeFrom (node);
  }

  /* ---- OPERATIONS ----- */
  findPrev (x) {
    // if =, return the node;
    // if >, go to right;
    // if <, go to left
    var curNode = this.root;
    var prevNode;

    while (curNode) {
      prevNode = curNode;

      if (curNode.data === x)
        return curNode;
      else if (curNode.data > x)
        curNode = curNode.left;
      else
        curNode = curNode.right;
    }

    return prevNode;
  }

  find (x) {
    var node = this._find (x);
    return node && node.data;
  }

  add(x)
  {
    var newNode = new Node (x);
    this._add (x, newNode);

    return newNode.id;
  }

  splice (u)
  {
    var child, parent;
    child = u.left || u.right;

    if (u === this.root){
      this.root    = child;
      child.parent = null;
    } else {
      parent = u.parent;
      if (parent.left === u)
        parent.left = child;
      else
        parent.right = child;
    }

    this.n --;
  }

  remove(x)
  {
    var node = this._find (x);
    if (!node) return false;
    this.nodesById[node.id] = null;

    if (!node.left || !node.right)
      this.splice (node);
    else {
      var cur = node.right;

      while (cur.left)
        cur = cur.left;

      node.data = cur.data;
      this.splice (cur);
    }
  }


  /* ------ USER MODEL ------ */
  makeNode (x) {
    // If we're passed a node, use that ; otherwise make new one using x
    var newNode = (x instanceof Node) ? x : new Node (x);

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
    for (var i in roots)
      trees.push (new __MODULENAME__ (roots [i]));
    return trees;
  }

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

  pathTo (x)
  {
    // Find operation ... return array of nodes on the path to given data
    var nodes = [ ];
    var curNode = this.root;

    while (curNode) {
      var d = curNode.data;
      nodes.push (curNode);

      if (d > x)
        curNode = curNode.left;
      else if (d < x)
        curNode = curNode.right;
      else
        break;
    }

    return nodes;
  }

  /* ------ EXERCISE STUFF ------ */
  equals(other)
  {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *                                                               *
     *  Logic for this: Get the toString version of both models,     *
     *   If they match, answer is correct. Otherwise, wrong.         *
     *                                                               *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     var myStr = this.toString ("  .  ");
     var otStr = other.toString ("  .  ");
     return myStr === otStr;
  }

  // NOTE: This can be overloaded for add() operations.
  getCloneParams(d, n){ return [d]; }

  copy()
  {
    var newTree = new __MODULENAME__ ();
    Traversal.preorder (this, (data, node)=>{
      newTree.add.apply (newTree, this.getCloneParams (data, node));
    });
    return newTree;
  }

  each (f)
  {
    Traversal.inorder (this, f);
  }

  contains (el)
  {
    // check if the model contains given element
    return this._find (el) !== null;
  }

  toString(){
    var s = "";
    this.each ((d)=>{s += d + " "; });
    return s;
  }

  toArray(){
    var array = [ ];

    this.each ((data)=>{
      array.push (data);
    });

    return array;
  }
}
