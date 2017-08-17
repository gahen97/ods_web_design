/*
  Template for a new Model. This contains all the functions needed by
    other classes and anything else can be overridden/added.

  Documentation:
    constructor ()
      Constructs a new Model.

    size () : int
      Returns the size of the model.

    equals (other : Model) : boolean
      Purpose: Checks if two models are equal.
      Arguments:
        other  Model  The model to compare against
      Returns: Boolean. True if the models are equal.

    each (f : function)
      Purpose: Calls function f on every value in the set.
      Arguments:
        f  function  The function to call. Should be passed (value, ...) with
                       other optional arguments.
      Returns: None

    contains (value : Any) : boolean
      Purpose: Checks if a given value exists in the model.
      Arguments:
        value  Any  The value to check for
      Returns: Boolean. True if the value is in the model, false otherwise.

    copy () : Model
      Returns a clone of the model inside of a new Model.

    toString () : string
      Returns a stringified version of the model.

  The model should add any other methods needed for Questions, User interaction,
    etc.
*/

/*jshint esversion: 6 */ 'use strict';

class SkiplistSSet extends Model {
  constructor()
  {
    super();

    this.sentinel = new Node (SENTINEL_VALUE, 0);
    this.n        = 0;
  }

  /* ---- MODEL IMPLEMENTATION ---- */
  _checkProceedRight (node, data){
    return node.data < data;
  }
  _nodeEquals (node, data){
    return node.data === data;
  }

  _findPredNode (x)
  {
    let u = this.sentinel;
    let r = this.height;

    while (r >= 0) {
      while (u.next [r] !== null && this._checkProceedRight (u.next [r], x))
        u = u.next [r];
      r--;
    }

    return u;
  }

  _pickHeight ()
  {
    let randNum = ODSRandom.getRandom ();
    let height  = 0;
    let m       = 1;

    while ((randNum & m) !== 0) {
      height ++;
      m <<= 1;
    }

    return height;
  }

  get height () { return this.sentinel.height; }

  find (x)
  {
    var pred = this._findPredNode (x);
    var node = pred && pred.next [0];
    return node ? node.x : null;
  }

  add (x)
  {
    let current = this.sentinel;
    let row     = this.height;
    let comp    = 0;

    let stack   = [ ];

    // Find the position to add the new node w/ all surrounding nodes
    while (row >= 0){
      while (current.next [row] && this._checkProceedRight (current.next [row], x))
        current = current.next [row];
      if (current.next [row] && this._nodeEquals (current.next [row], x)) return false;
      stack [row --] = current;
    }

    // Create the node & update our height, if needed
    let newNode = new Node (x, this._pickHeight ());
    for (let row = this.height; row < newNode.height; row++)
      stack [row] = this.sentinel;

    // Add the node in
    for (let i = 0; i < newNode.height; i++) {
      newNode.next [i]   = stack [i].next [i];
      stack [i].next [i] = newNode;
    }

    this.n ++;
    return true;
  }

  remove (x)
  {
    let removed = false;
    let current = this.sentinel;
    let row     = this.height;

    while (row >= 0) {
      while (current.next [row] && this._checkProceedRight (current.next [row], x))
        current = current.next [row];

      if (current.next [row] && this._nodeEquals (current.next [row], x)) {
        removed = true;
        current.next [row] = current.next [row].next [row];
        if (current === this.sentinel && current.next [row] === null)
          current.next.pop ();
      }

      row --;
    }

    if (removed)
      this.n --;

    return removed;
  }

  size()
  {
    return this.n;
  }

  /* ---- EXERCISE STUFF ---- */
  equals(other)
  {
    // If you want to check if two Skiplists are equal, you have to check every pointer:
    //   For every node in the Skiplist:
    //     For every element in next
    //       Are the two element's next pointers correct?
    //         > Point to the same elements
    //         > Maybe go through, set an index on each node, check if indices match.
    //         Obviously, in a SortedSet, there are no indices. But there's a sort.
    //           And as with any sort, you have a concept of order. This can use order.
    return false;
  }

  _copyNode (node, index){
    // NOTE: This creates a new node with the same data and height.
    //       This does not copy pointers.
    var newNode = new Node (node.data, node.height, {
      index: index
    });
    return newNode;
  }

  copy()
  {
    // Here we want to make:
    //   1) Copy the first list exactly, copying the data of each node.
    //   2) Update all pointers to point to the correct node in the new list
    //   3) Return the new list
    var newSkipList = new __MODULENAME__ (); // for overloading
    var newNodes    = [ ];

    // Walk through the bottom list & create clones of all nodes
    this.each ((data, currentNode, index) => {
      if (currentNode === this.sentinel) return;

      newNodes.push (this._copyNode (currentNode, index));
    });

    // Connect the pointers on every node
    // This requires another step through the bottom list
    var otherNode = newSkipList.sentinel;
    this.each ((data, currentNode, index) => {
      for (var row in currentNode.next) {
        var next = currentNode.next [row];
        otherNode.next [row] = newNodes [next.index];
      }
    });

    return newSkipList;
  }

  toString ()
  {
    var s = "";
    this.each ((data)=>{
      s += data + " -> ";
    });
    return s.substring (0, s.length-4);
  }

  toArray ()
  {
    var arr = [ ];
    this.each ((data)=>{
      arr.push (data);
    });
    return arr;
  }

  /* NEEDED FUNCTIONS */
  each (f)
  {
    var currentNode = this.sentinel;
    var index       = -1;
    while (currentNode) {
      if (f (currentNode.data, currentNode, index ++) === false)
        return;
      currentNode = currentNode.next [0];
    }
  }

  contains (el)
  {
    var contained = false;
    this.each ((data)=>{
      if (data === el) {
        contained = true;
        return false;
      }
    });
    return contained;
  }
}
