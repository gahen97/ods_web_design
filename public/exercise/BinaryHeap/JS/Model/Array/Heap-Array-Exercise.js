/*
  Binary Heap Array implementation for the exercise ...
  Holds exercise-specific methods
*/

class BinaryHeapArray extends BHeapArray {
  generate (tree) {
    var a = [ ];
    Traverse.breadthFirst (tree, (data)=>a.push (data));

    this.arr = a;
    this.resize ();
  }

  /* --- EXERCISE STUFF --- */
  get valid () {
    // For it to be valid, must follow the heap property:
    // Value at index i is not smaller than value at index parent(i),
    //   excluding the root (i = 0).
    var a = this.arr;
    for (let i = 1; i < a.length; i++)
      if (a [i] < a [this.parent (i)])
        return false;
    return true;
  }

  each (f) {
    for (var i in this.arr)
      if (f (this.arr [i], i) === false)
        return false;
    return true;
  }

  equals (other) {
    return this.each ((data,index)=>{
      other.arr [index] === data;
    });
  }

  copy () {
    var newArr = [ ];
    this.each ( (data)=>newArr.push (data) );
    return new __ARRAYMODULENAME__ (newArr);
  }

  indexOf (el){ return this.arr.indexOf(el); }
  toString (d) { return this.arr.join (d); }
  toArray () { return this.copy ().arr; } // NOTE: Returns a copy, so you can't edit the array itself
}
