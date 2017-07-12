/*
  Treap Node
*/
/*jshint esversion: 6 */

class Node {
  constructor(data, p){
    this.data      = data;
    this.p         = p;
    this.leftNode  = null;
    this.rightNode = null;
    this.parent    = null;
  }

  get left () { return this.leftNode; }
  set left (newLeft) {
    if (newLeft)
      newLeft.parent = this;
    this.leftNode  = newLeft;
  }

  get right () { return this.rightNode; }
  set right (newRight) {
    if (newRight)
      newRight.parent = this;
    this.rightNode  = newRight;
  }
}


/*jshint esversion: 6 */ 'use strict';

class BinarySearchTree extends Model {
  constructor(root)
  {
    super();

    this.root = root || null;
    this.n    = this.root ? this._size (this.root) : 0;
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
    return true;
  }

  _subtreeFrom (u) {
    return new BinarySearchTree (u);
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
    var node = this.find (x);
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

  toArray(){
    var array = [ ];

    this.each ((data)=>{
      array.push (data);
    });

    return array;
  }
}


function log(b, n){ return Math.log(n) / Math.log (b); }

class ScapegoatTree extends BinarySearchTree {
  constructor(){
    super();
    this.q = 0;
  }

  /* ----- OPERATIONS ------- */
  add (x) {
    var u = new Node (x);
    if (!super._add (x, u))
      return false;
    this.q++;

    var depth = this.depth (x)
    if (depth > log (3/2, this.q)){
      var w = u.parent;

      while (3 * this._size (w) <= 2 * this._size (w.parent))
        w = w.parent;

      this.rebuild (w.parent);
    }

    return true;
  }

  remove (x) {
    if (!super.remove (x)) return false;
    if (this.n * 2 < this.q){
      this.rebuild (this.root);
      this.q = this.n;
    }
    return true;
  }


  /* ----- REBUILDING ----- */
  packIntoArray (from) {
    var arr = [ ];
    this._subtreeFrom(from).each (function (_, node) {
      arr.push (node);
    })
    return arr;
  }

  rebuild(u) {
    if (!u) return false;
    var p = u.parent;
    var a = this.packIntoArray (u);

    if (!p) {
      this.root = this.buildBalanced (a, 0, a.length);
      this.root.parent = null;
    } else if (p.right === u)
      p.right = this.buildBalanced (a, 0, a.length);
    else
      p.left = this.buildBalanced (a, 0, a.length);
  }

  buildBalanced (a, i, s) {
    if (!s) return null;
    var m = Math.floor (s/2);

    a[i + m].left = this.buildBalanced (a, i, m);
    a[i + m].right = this.buildBalanced (a, i + m + 1, s - m - 1);

    return a [i + m];
  }
}




class Traversal{
  static inorderTraversal (root, func) {
    if (!root) return false;

    Traversal.inorderTraversal (root.left, func);
    func (root.data, root);
    Traversal.inorderTraversal (root.right, func);
  }

  static preorderTraversal (root, func) {
    if (!root) return false;

    func (root.data, root);
    Traversal.preorderTraversal (root.left, func);
    Traversal.preorderTraversal (root.right, func);
  }

  static postorderTraversal (root, func) {
    if (!root) return false;

    Traversal.postorderTraversal (root.left, func);
    Traversal.postorderTraversal (root.right, func);
    func (root.data, root);
  }

  static inorder (tree, func){
    Traversal.inorderTraversal (tree.root, func);
  }
  static preorder (tree, func){
    Traversal.preorderTraversal (tree.root, func);
  }
  static postorder (tree, func){
    Traversal.postorderTraversal (tree.root, func);
  }
}


var t = new ScapegoatTree ();
t.add (7);
t.add (6);
t.add (5);
t.add (4);
t.add (3);
t.add (2);
t.add (1);
t.add (0);
