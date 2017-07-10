/*jshint esversion: 6 */ 'use strict';

class BinarySearchTree extends Model {
  constructor()
  {
    super();

    this.root = null;
    this.n    = 0;
  }

  size()
  {
    return this.n;
  }

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
  }

  remove(x)
  {
    var node = this.find (x);
    if (!node) return false;
  }

  find(x)
  {
    var node = this.findPrev (x);
    if (node && node.data === x)
      return node;
    return null;
  }

  equals(other)
  {
    // given another model, check if the two are equal.
    // returns true if equal, false if not.
  }

  copy()
  {
    // copy this model into a new model, returning the new model.
  }

  each (f)
  {
    var cur  = this.root;
    var prev = null;

    while (cur !== null){
      if (prev === cur.parent && cur.left){
        prev = cur;
        cur  = cur.left;
      } else {
        if (prev === cur.left || prev === cur.parent)
          f (cur);

        if (cur.right){
          prev = cur;
          cur  = cur.right;
        } else {
          prev = cur;
          cur  = cur.parent;
        }
      }
    }
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
