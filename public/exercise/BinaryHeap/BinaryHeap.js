/*
  This has to be changed. Currently, it'll perform trickleDown and bubbleUp itself,
    which, for the user model, it shouldn't - otherwise the two won't match.
  There should be some way to insert to a DIRECT position and have everything
    else move to match that ... then the user has to position them correctly,
    following the heap property, and be tested on that.

  SO AS IT IS NOW:
        1
      /   \
     2     3
    / \   / \
   0  4  6  9

  Will be automatically adjusted to fit the heap property, and be correct,
    even though it isn't (0 can't be below 2). This is an issue.
*/


/*jshint esversion: 6 */ 'use strict';

class BinaryHeap extends Model {
  constructor()
  {
    super();

    // anything needed for the model gets initialized here
    this.heap = [ ];

    // THIS IS A BIT HACKY.
    // When an element is added, it'll get a counter +1 to this object ..
    // When element removed, the counter gets - 1
    // If the counter is > 0 for any element, it exists in the heap
    this.containing = { };
  }

  left (i) {
    return 2 * i + 1;
  }
  right (i) {
    return 2 * (i + 1);
  }
  parent (i) {
    return Math.floor ((i - 1) / 2);
  }

  size()
  {
    return this.heap.length;
  }

  add(x)
  {
    this.heap.push (x);
    this.bubbleUp (this.heap.length - 1);
    this.inc (x);
    return true;
  }

  remove()
  {
    var arr = this.heap;
    var rem = arr [0];
    arr [0] = arr [arr.length-1];
    arr.pop ();

    this.trickleDown (0);

    this.dec (rem);
    return rem;
  }

  equals(other)
  {
    // given another model, check if the two models are equal.
    // return a boolean : true if equal, false otherwise
    for (var i in this.containing)
      if (this.containing[i] !== other.containing[i]) return false;

    for (var i in other.containing)
      if (this.containing[i] !== other.containing[i]) return false;

    return true;
  }

  copy()
  {
    var newHeap = new BinaryHeap ();
    var arr     = this.heap;

    for (var i in arr)
      newHeap.add (arr [i]);

    return newHeap;
  }

  bubbleUp (i) {
    var a = this.heap;
    var p = this.parent (i);
    while (i > 0 && a[i] < a[p]) {
      var temp = a[i];
      a[i]     = a[p];
      a[p]     = temp;
      i        = p;
      p        = this.parent (i);
    }
  }

  trickleDown (i) {
    var a = this.heap;
    while (i >= 0) {
      var j = -1;
      var right = this.right (i);
      var left  = this.left (i);

      if (right < a.length && a[right] < a[i]){
        if (left < a.length && a[left] < a[right])
          j = left;
        else
          j = right;
      } else if (left < a.length && a[left] < a[i])
        j = left;

      if (j >= 0)
        this.swap (i, j);

      i = j;
    }
  }

  swap (i,j){
    var a    = this.heap;
    var temp = a [i];
    a [i]    = a [j];
    a [j]    = temp;
  }

  inc (x) {
    if (typeof this.containing [x] !== "number")
      this.containing [x] = 0;
    this.containing [x] ++;
  }

  dec (x) {
    this.containing[x] --;
  }

  toString ()
  {
    return this.heap.toString();
  }

  /* NEEDED FUNCTIONS */
  each (f)
  {
    var a = this.heap;
    for (var i in a)
      f (a[i]);
  }

  contains (x)
  {
    return this.containing [x] > 0;
  }
}
