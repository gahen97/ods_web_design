/*
  Array implementation:
    generate (tree)
      traverse tree, BFS
      add each element to an array
      set this array to the new array

    would have array-specific implementation
      left ()
      right ()
      parent ()


    Ideally, BinaryHeap would look like:
      BinaryHeap
        HAS A:
          BinaryHeapArray -- array implementation
          BinaryHeapTree -- tree implementation
            BinarySearchTree -- base
        controls tree & array
*/

class BHeapArray {
  constructor(array){
    // NOTE: because arrays in javascript are automatically handled with the resize and etc.,
    //       going to be a bit backwards - len will be array length displayed,
    //       array.length will be n.
    this.arr = array || [ ];
    this.resize ();
  }

  /* --- DEFAULTIO --- */
  compare (a, b) { return a-b; }
  swap (i, j) {
    var temp     = this.arr [i];
    this.arr [i] = this.arr [j];
    this.arr [j] = temp;
  }

  /* --- PATTERNS --- */
  parent(i){ return Math.floor ((i-1)/2); }
  left  (i) { return 2 * i + 1; }
  right (i) { return 2 * i + 2; }

  /* --- OPERATIONS ---- */
  add (x) {
    if (this.arr.length >= this.len)
      this.resize ();

    this.arr.push (x);
    this.bubbleUp (this.arr.length-1);

    return true;
  }
  remove (x) {
    var a = this.arr;

    var x = a [0];
    a [0] = a [a.length - 1];
    this.trickleDown (0);

    if (3 * a.length < this.len)
      this.resize ();

    return x;
  }

  /* --- HELPERS --- */
  bubbleUp (i) {
    var a = this.arr;

    var p = this.parent (i);
    while (i > 0 && this.compare (a [i], a [p]) < 0) {
      this.swap (i, p);
      i = p;
      p = this.parent (i);
    }
  }
  trickleDown (i) {
    var a = this.arr;
    do {
      var j = -1;
      var r = this.right (i);
      var l = this.left (i);

      // NOTE: this is taken directly from the textbook
      // http://opendatastructures.org/ods-java/10_1_BinaryHeap_Implicit_Bi.html
      if (r < a.length && this.compare (a [r], a [i]) < 0)
        j = (this.compare (a [l], a [r]) < 0) ? l : r;
      else if (l < a.length && this.compare (a [l], a [i]) < 0)
        j = l;

      if (j >= 0) this.swap (i,j);
      i = j;
    } while (i >= 0);
  }

  resize(){ this.len = this.arr.length * 2; }
}
