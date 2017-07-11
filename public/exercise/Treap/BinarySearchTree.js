/*jshint esversion: 6 */ 'use strict';

class BinarySearchTree extends Model {
  constructor(r)
  {
    super();

    this.root = r || null;
    this.n    = r ? this._size (r) : 0;
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

  _subtree (u) {
    if (!u) return false;
    return new BinarySearchTree (u);
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
    return true;
  }

  /* ---- TERMINOLOGY ----- */
  size(x)
  {
    var u = (x || x === 0) ? this.find (x) : this.root;
    return this._size (u);
  }

  depth (x) {
    var node = this.find (x);
    if (!node) return -1;

    var depth = 0;
    while (node !== this.root) {
      node = node.parent;
      depth ++;
    }

    return depth;
  }

  height (x) {
    var node = this.find (x);
    if (!node) return -1;

    return this._height (node);
  }

  subtree (x) {
    var u = this.find (x);
    if (!u) return null;
    return this._subtree (u);
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

  add(x)
  {
    var newNode = new Node (x);
    this._add (x, newNode);
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
    var node = this.find (x);
    if (!node) return false;

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

  find(x)
  {
    var node = this.findPrev (x);
    if (node && node.data === x)
      return node;
    return null;
  }


  /* ------ EXERCISE STUFF ------ */
  equals(other)
  {
    var result = true;
    this.each ((data) => {
      if (!other.contains (data))
        result = false;
    });

    return result;
  }

  copy()
  {
    var newTree = new BinarySearchTree ();
    Traversal.preorder (this, (data)=>{
      newTree.add (data);
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
    return this.find (el) !== null;
  }

  toString(){
    var s = "";
    this.each ((d)=>{s += d + " "; });
    return s;
  }
}
